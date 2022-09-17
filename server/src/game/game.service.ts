import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Games } from './enitites/game.entity';
import { createGame } from './dto/createGame.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Games)
    private readonly gameRepository: Repository<Games>,
  ) {}

  async insertGame(data: createGame): Promise<Games> {
    return await this.gameRepository.save(data);
  }

  async updatePlayerUserName(playerId: string, playerUserName: string) {
    await this.gameRepository
      .createQueryBuilder()
      .update({ firstPlayerUserName: playerUserName })
      .where([
        {
          firstPlayer: playerId,
        },
      ])
      .execute();

    await this.gameRepository
      .createQueryBuilder()
      .update({ secondPlayerUserName: playerUserName })
      .where([
        {
          secondPlayer: playerId,
        },
      ])
      .execute();
  }

  async updatePlayerImage(playerId: string, playerImg: string) {
    await this.gameRepository
      .createQueryBuilder()
      .update({ firstPlayerImage: playerImg })
      .where([
        {
          firstPlayer: playerId,
        },
      ])
      .execute();

    await this.gameRepository
      .createQueryBuilder()
      .update({ secondPlayerImage: playerImg })
      .where([
        {
          secondPlayer: playerId,
        },
      ])
      .execute();
  }
}
