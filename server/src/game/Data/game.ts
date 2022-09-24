import { Player } from './player';
import { Ball } from './ball';
import { gameState } from './gameState';
import { Socket } from 'socket.io';
import { GameData } from './constant';
import { GameService } from '../game.service';
import { createGame } from '../dto/createGame.dto';

export class Game {
  private id: string;
  private player_1: Player;
  private player_2: Player;
  private ball: Ball;
  private Interval: NodeJS.Timer;
  private gameService: GameService;
  private watchers: Socket[] = [];
  private sendGames: Function;
  private server: {
    emit: (
      arg0: string,
      arg1: {
        playing: boolean;
        first: { username: any; avatar: any };
        second: { username: any; avatar: any };
      },
    ) => void;
  };
  private game: Array<Game> = [];

  constructor(
    player_One: Player,
    player_Two: Player,
    gameService: GameService,
    sendGames: Function,
    server: {
      emit: (
        arg0: string,
        arg1: {
          playing: boolean;
          first: { username: any; avatar: any };
          second: { username: any; avatar: any };
        },
      ) => void;
    },
    game: Array<Game>,
  ) {
    // this.id = uuid();
    this.server = server;
    this.sendGames = sendGames;
    this.player_1 = player_One;
    this.player_2 = player_Two;
    this.ball = new Ball(this.sendGames, this.server);
    this.gameService = gameService;
    this.game = game;
    this.Interval = setInterval(() => {
      this.playGame(this.player_1, this.player_2);
    }, 1000 / 60);
  }

  public getId(): string {
    return this.id;
  }

  public stopGame(): void {
    clearInterval(this.Interval);
    this.player_1.stopPaddle();
    this.player_2.stopPaddle();

    const findGame = this.game.findIndex((g) => {
      return g.getId() === this.id;
    });
    this.game.splice(findGame, 1);

    this.sendGames(this.server);

    const gameDta = new createGame();
    gameDta.id = this.id;
    gameDta.firstPlayer = this.player_1.getUserId();
    gameDta.secondPlayer = this.player_2.getUserId();
    gameDta.firstPlayerImage = this.player_1.getAvatar();
    gameDta.secondPlayerImage = this.player_2.getAvatar();
    gameDta.firstPlayerUserName = this.player_1.getUsername();
    gameDta.secondPlayerUserName = this.player_2.getUsername();
    gameDta.scoreFirst = this.player_1.getScore();
    gameDta.scoreSecond = this.player_2.getScore();
    this.gameService.insertGame({
      ...gameDta,
      scoreFirst: this.player_2.getScore(),
      scoreSecond: this.player_1.getScore(),
    });
  }

  public gameStateGen(): gameState {
    if (
      this.player_1.getScore() === GameData.max_score ||
      this.player_2.getScore() === GameData.max_score
    )
      return gameState.OVER;
    return gameState.PLAY;
  }

  public playGame(player_One: Player, player_Two: Player): void {
    this.sendGames(this.server);
    if (this.ball.checkCollision(player_One.getPaddle())) {
      this.ball.handleCollision(player_One);
    }
    if (this.ball.checkCollision(player_Two.getPaddle())) {
      this.ball.handleCollision(player_Two);
    }
    this.ball.update_score(player_One, player_Two);
    this.ball.moveBall();
    if (this.gameStateGen() === gameState.OVER) {
      this.stopGame();
    }
    this.player_1.getSocket().emit('gameState', {
      ball: {
        ball_x: this.ball.getBall_X(),
        ball_y: this.ball.getBall_Y(),
      },
      paddle: {
        paddle_left: this.player_1.getPaddle().get_PaddleY(),
        paddle_right: this.player_2.getPaddle().get_PaddleY(),
      },
      score: {
        playerOne_Score: this.player_1.getScore(),
        playerTwo_Score: this.player_2.getScore(),
      },
      watcher_count: this.watchers.length + 0,
      currentState: this.gameStateGen(),
      isWin: this.player_1.checkWin(),
    });
    this.player_2.getSocket().emit('gameState', {
      ball: {
        ball_x: this.ball.getBall_X(),
        ball_y: this.ball.getBall_Y(),
      },
      paddle: {
        paddle_left: this.player_1.getPaddle().get_PaddleY(),
        paddle_right: this.player_2.getPaddle().get_PaddleY(),
      },
      score: {
        playerOne_Score: this.player_1.getScore(),
        playerTwo_Score: this.player_2.getScore(),
      },
      watcher_count: this.watchers.length + 0,
      currentState: this.gameStateGen(),
      isWin: this.player_2.checkWin(),
    });
    this.watchers.forEach((w) => {
      w.emit('gameState', {
        ball: {
          ball_x: this.ball.getBall_X(),
          ball_y: this.ball.getBall_Y(),
        },
        paddle: {
          paddle_left: this.player_1.getPaddle().get_PaddleY(),
          paddle_right: this.player_2.getPaddle().get_PaddleY(),
        },
        score: {
          playerOne_Score: this.player_1.getScore(),
          playerTwo_Score: this.player_2.getScore(),
        },
        watcher_count: this.watchers.length + 0,
      });
    });
  }

  public get_GamePlayer(player: Socket): Player {
    if (this.player_1.getSocket() === player) return this.player_1;
    else if (this.player_2.getSocket() === player) return this.player_2;
    return null;
  }

  public getball(): Ball {
    return this.ball;
  }

  public get_PlayerOne(): Player {
    return this.player_1;
  }

  public get_PlayerTwo(): Player {
    return this.player_2;
  }

  public playerOutGame(client: Socket): void {
    if (this.player_1.getSocket() === client) {
      this.player_1.setScore(GameData.max_score);
      this.player_2.setScore(0);
      this.player_1.checkWin();
      this.player_2.checkWin();
    } else if (this.player_2.getSocket() === client) {
      this.player_2.setScore(GameData.max_score);
      this.player_1.setScore(0);
      this.player_2.checkWin();
      this.player_1.checkWin();
    }
    this.player_1.getSocket().emit('gameState', {
      ball: {
        ball_x: this.ball.getBall_X(),
        ball_y: this.ball.getBall_Y(),
      },
      paddle: {
        paddle_left: this.player_1.getPaddle().get_PaddleY(),
        paddle_right: this.player_2.getPaddle().get_PaddleY(),
      },
      score: {
        playerOne_Score: this.player_1.getScore(),
        playerTwo_Score: this.player_2.getScore(),
      },
      currentState: this.gameStateGen(),
      isWin: this.player_1.checkWin(),
    });

    this.player_2.getSocket().emit('gameState', {
      ball: {
        ball_x: this.ball.getBall_X(),
        ball_y: this.ball.getBall_Y(),
      },
      paddle: {
        paddle_left: this.player_1.getPaddle().get_PaddleY(),
        paddle_right: this.player_2.getPaddle().get_PaddleY(),
      },
      score: {
        playerOne_Score: this.player_1.getScore(),
        playerTwo_Score: this.player_2.getScore(),
      },
      currentState: this.gameStateGen(),
      isWin: this.player_2.checkWin(),
    });
  }

  public getSubGame(): any {
    return {
      player_1: {
        id: this.player_1.getUserId(),
        username: this.player_1.getUsername(),
        avatar: this.player_1.getAvatar(),
        score: this.player_1.getScore(),
      },
      player_2: {
        id: this.player_2.getUserId(),
        username: this.player_2.getUsername(),
        avatar: this.player_2.getAvatar(),
        score: this.player_2.getScore(),
      },
      gameId: this.id,
    };
  }

  public getWatchers(): Socket[] {
    return this.watchers;
  }

  public addWatcher(watcher: Socket): void {
    const findWtcher = this.watchers.find((w) => {
      return w === watcher;
    });
    if (!findWtcher) this.watchers.push(watcher);
  }
}
