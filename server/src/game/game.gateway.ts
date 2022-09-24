import { Inject, Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GameService } from './game.service';
import User from 'src/users/entities/user.entity';
import { config } from 'dotenv';
import { JwtPayload } from 'src/chat/chat.gateway';
import { UsersService } from 'src/users/users.service';
import { Game } from './Data/game';
import { gameState } from './Data/gameState';
import { Player } from './Data/player';
import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

config({ path: '../.env' });

@WebSocketGateway({
  cors: {
    origin: `${process.env.FRONT_HOST}`,
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
  namespace: 'game',
})
export class GameGateway implements OnGatewayInit, OnGatewayDisconnect
{
  constructor(private readonly usersService: UsersService) {}

  private logger: Logger = new Logger('GameGateway');
  private playerOne: Player;
  private playerTwo: Player;
  static game: Game[] = [];
  private socketArr: Set<Socket> = new Set<Socket>();
  private userArr: any[] = [];

  private privateRoomGameSockets: Map<string, Socket[]> = new Map();
  private privateGameUser: Map<string, User[]> = new Map();

  @WebSocketServer() server: {
    emit: (
      arg0: string,
      arg1: {
        playing: boolean;
        first: { username: any; avatar: any };
        second: { username: any; avatar: any };
      },
    ) => void;
  };

  @Inject()
  private jwtService: JwtService;

  @Inject()
  private gameService: GameService;

  afterInit(server: any) {
    this.logger.log('Initial');
  }
  @UseGuards(JwtAuthGuard)
  handleConnection(client: Socket, ...args: any[]) {
    if (!client.handshake.headers.cookie) {
      client.disconnect();
      return;
    }
    const user_id = this.getUserIdFromJWT(client.handshake.headers.cookie);
    if (!user_id) {
      client.disconnect();
      return;
    }
    this.logger.log('Connect Success ' + `${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnected ' + `${client.id}`);
    const gameFound = GameGateway.game.find((gm) => {
      return (
        gm.get_PlayerOne().getSocket() === client ||
        gm.get_PlayerTwo().getSocket() === client
      );
    });
    if (gameFound) {
      if (gameFound.gameStateGen() === gameState.PLAY) {
        gameFound.playerOutGame(client);
        gameFound.stopGame();
        GameGateway.game.splice(GameGateway.game.indexOf(gameFound), 1);
      }
    }
  }

  @SubscribeMessage('join_match')
  hundle_join_match(client: Socket, payload: any) {
    this.logger.log('Join Match ' + `${client.id} `);
    const user: any = payload.user;
    if (!payload.room_id) {
      console.log('user => ', payload.user);
      if (this.socketArr.has(client)) {
        return;
      }
      this.socketArr.add(client);
      this.userArr.push({ ...user, avatar: user.image });
      const itSock = this.socketArr.values();
      const [first, second] = this.userArr;

      if (this.userArr.length > 1) {
        if (first.id === second.id) {
          this.userArr.splice(this.userArr.indexOf(first), 1);
          return;
        }
        this.server.emit('Playing', {
          playing: true,
          first: { username: first.userName, avatar: first.avatar },
          second: { username: second.userName, avatar: second.avatar },
        });
        this.playerOne = new Player(
          itSock.next().value,
          true,
          first.id,
          first.userName,
          first.avatar,
        );
        this.playerTwo = new Player(
          itSock.next().value,
          false,
          second.id,
          second.userName,
          second.avatar,
        );

        const newGame = new Game(
          this.playerOne,
          this.playerTwo,
          this.gameService,
          this.sendGames,
          this.server,
          GameGateway.game,
        );

        GameGateway.game.push(newGame);
        this.sendGames(this.server);

        this.socketArr.delete(newGame.get_PlayerOne().getSocket());
        this.socketArr.delete(newGame.get_PlayerTwo().getSocket());
        this.userArr.splice(0, this.userArr.length);
      }
    } else {
      if (this.privateGameUser.has(payload.room_id)) {
        [...this.privateGameUser.get(payload.room_id)]?.forEach((user) => {
          if (user.id == payload.user.id) {
            return;
          }
        });
      }
      if (
        this.privateRoomGameSockets.has(payload.room_id) &&
        this.privateRoomGameSockets.get(payload.room_id)[0].id === client.id
      ) {
        return;
      }
      if (
        this.privateGameUser.has(payload.room_id) &&
        this.privateGameUser.get(payload.room_id)[0].id == payload.user.id
      ) {
        return;
      }
      if (this.privateRoomGameSockets.has(payload.room_id)) {
        this.privateRoomGameSockets.set(payload.room_id, [
          ...this.privateRoomGameSockets.get(payload.room_id),
          client,
        ]);
        this.privateGameUser.set(payload.room_id, [
          ...this.privateGameUser.get(payload.room_id),
          payload.user,
        ]);
      } else {
        this.privateRoomGameSockets.set(payload.room_id, [client]);
        this.privateGameUser.set(payload.room_id, [payload.user]);
      }

      if (
        [...this.privateRoomGameSockets.get(payload.room_id)].length > 1 &&
        [...this.privateGameUser.get(payload.room_id)].length > 1
      ) {
        this.server.emit('Playing', {
          playing: true,
          first: {
            username: this.privateGameUser.get(payload.room_id)[0].userName,
            avatar: this.privateGameUser.get(payload.room_id)[0].image,
          },
          second: {
            username: this.privateGameUser.get(payload.room_id)[1].userName,
            avatar: this.privateGameUser.get(payload.room_id)[1].image,
          },
        });

        this.playerOne = new Player(
          [...this.privateRoomGameSockets.get(payload.room_id)][0],
          true,
          this.privateGameUser.get(payload.room_id)[0].id,
          this.privateGameUser.get(payload.room_id)[0].userName,
          this.privateGameUser.get(payload.room_id)[0].image,
        );
        this.playerTwo = new Player(
          [...this.privateRoomGameSockets.get(payload.room_id)][1],
          false,
          this.privateGameUser.get(payload.room_id)[1].id,
          this.privateGameUser.get(payload.room_id)[1].userName,
          this.privateGameUser.get(payload.room_id)[1].image,
        );

        const newGame = new Game(
          this.playerOne,
          this.playerTwo,
          this.gameService,
          this.sendGames,
          this.server,
          GameGateway.game,
        );
        GameGateway.game.push(newGame);
        this.sendGames(this.server);

        this.privateGameUser.delete(payload.room_id);
        this.privateRoomGameSockets.delete(payload.room_id);
      }
    }
  }

  @SubscribeMessage('up')
  hundle_up_paddle(client: Socket, payload: string) {
    const gameFound = GameGateway.game.find((gm) => {
      return (
        gm.get_PlayerOne().getSocket() === client ||
        gm.get_PlayerTwo().getSocket() === client
      );
    });
    if (gameFound) {
      const player: Player = gameFound.get_GamePlayer(client);
      if (payload === 'down') {
        player.getPaddle().up('down');
      } else if (payload === 'up') {
        player.getPaddle().up('up');
      }
    }
  }

  @SubscribeMessage('down')
  hundle_down_paddle(client: Socket, payload: string) {
    const gameFound = GameGateway.game.find((gm) => {
      return (
        gm.get_PlayerOne().getSocket() === client ||
        gm.get_PlayerTwo().getSocket() === client
      );
    });
    console.log('game founds :', gameFound);
    if (gameFound) {
      const player = gameFound.get_GamePlayer(client);
      if (payload === 'down') player.getPaddle().down('down');
      else if (payload === 'up') player.getPaddle().down('up');
    }
  }

  private sendGames(_server: any) {
    const gameObj = { games: GameGateway.game.map((g) => g.getSubGame()) };
    _server.emit('receive_games', JSON.stringify(gameObj, null, 2));
  }

  @SubscribeMessage('send_games')
  handle_receiveGame(client: Socket, payload: any) {
    if (GameGateway.game.length !== 0) {
      const gameObj = { games: GameGateway.game.map((g) => g.getSubGame()) };
      client.emit('receive_games', JSON.stringify(gameObj, null, 2));
    }
  }
  @SubscribeMessage('watchers')
  handle_watchers(client: Socket, payload: any) {
    const gameFound = GameGateway.game.find((gm) => {
      return gm.getId() === payload.gameId;
    });

    if (gameFound) gameFound.addWatcher(client);
  }

  @SubscribeMessage('STOP_GAME')
  stopGame(client: Socket) {
    const gameFound = GameGateway.game.find((gm) => {
      return (
        gm.get_PlayerOne().getSocket() === client ||
        gm.get_PlayerTwo().getSocket() === client
      );
    });
    if (gameFound) {
      if (gameFound.gameStateGen() === gameState.PLAY) {
        gameFound.playerOutGame(client);
        gameFound.stopGame();
        GameGateway.game.splice(GameGateway.game.indexOf(gameFound), 1);
      }
    }
  }

  public getUserIdFromJWT(cookies: string): string {
    const decodedJwtAccessToken: any = this.jwtService.decode(
      this.parseCookie(cookies)['access_token'],
    );
    const jwtPayload: JwtPayload = { ...decodedJwtAccessToken };
    return jwtPayload.id;
  }

  parseCookie(cookies: any) {
    if (cookies) {
      cookies = cookies.split('; ');
      const result = {};
      for (const i in cookies) {
        const cur = cookies[i].split('=');
        result[cur[0]] = cur[1];
      }
      return result;
    }
  }
}
