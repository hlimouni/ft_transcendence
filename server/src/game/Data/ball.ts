import { GameData } from './constant';
import { Paddle } from './paddle';
import { Player } from './player';

export class Ball {
  private x: number;
  private y: number;
  private vel_x: number;
  private vel_y: number;
  private speed: number;
  private sendGame: Function;
  private server: any;

  constructor(sendGame: Function, server: any) {
    this.server = server;
    this.sendGame = sendGame;
    this.x = GameData.cWidth / 2;
    this.y = GameData.cHeight / 2;
    this.speed = GameData.ball_speed;
    this.vel_x = GameData.ball_speed * this.getRandomDir();
    this.vel_y = GameData.ball_speed * this.getRandomDir();
  }

  private getRandomDir(): number {
    const random: number = Math.floor(Math.random() * 1337);
    if (random % 2 == 0) {
      return -1;
    }
    return 1;
  }
  public moveBall(): void {
    this.x += this.vel_x;
    this.y += this.vel_y;
    if (
      this.y + GameData.ball_rad >=
        GameData.cHeight - GameData.boundedPaddle ||
      this.y - GameData.ball_rad <=
        GameData.boundedPaddle
    )
      this.vel_y = -this.vel_y;
  }

  public checkCollision(paddle: Paddle): boolean {
    let paddle_top: number = paddle.get_PaddleY();
    let paddle_bottom: number =
      paddle.get_PaddleY() + GameData.padd_h;
    let paddle_left: number = paddle.get_PaddleX();
    let paddle_right: number =
      paddle.get_PaddleX() + GameData.padd_w;

    let ball_top: number = this.y - GameData.ball_rad;
    let ball_bottom: number = this.y + GameData.ball_rad;
    let ball_left: number = this.x - GameData.ball_rad;
    let ball_right: number = this.x + GameData.ball_rad;

    return (
      ball_right > paddle_left &&
      ball_top < paddle_bottom &&
      ball_left < paddle_right &&
      ball_bottom > paddle_top
    );
  }

  public handleCollision(player: Player): void {
    let collidePoint: number =
      this.y -
      (player.getPaddle().get_PaddleY() + GameData.padd_h / 2);

    collidePoint = collidePoint / (GameData.padd_h / 2);

    let angleRad: number = (Math.PI / 4) * collidePoint;

    let direction: number =
      (this.x + GameData.ball_rad < GameData.cWidth / 2)
        ? 1
        : -1;

    this.vel_x = direction * this.speed * Math.cos(angleRad);
    this.vel_y = this.speed * Math.sin(angleRad);

    this.setSpeed(this.getSpeed() + 1);
  }

  public update_score(player_One: Player, player_Two: Player): void {
    if (this.x - GameData.ball_rad <= 0) {
      player_One.setScore(player_One.getScore() + 1);
      this.resetBall(true);
    } else if (
      this.x + GameData.ball_rad >=
      GameData.cWidth
    ) {
      player_Two.setScore(player_Two.getScore() + 1);
      this.resetBall(false);
    }
  }

  public resetBall(check: boolean): void {
    this.x = GameData.cWidth / 2;
    this.y = GameData.cHeight / 2;
    this.speed = GameData.ball_speed;
    this.vel_x = GameData.ball_speed * this.getRandomDir();
    this.vel_y = GameData.ball_speed * this.getRandomDir();
  }

  public getBall_X(): number {
    return this.x;
  }

  public getBall_Y(): number {
    return this.y;
  }

  public getBall_DX(): number {
    return this.vel_x;
  }

  public getBall_DY(): number {
    return this.vel_y;
  }
  public getSpeed(): number {
    return this.speed;
  }
  public setSpeed(speed: number): void {
    if (this.speed < GameData.ball_max_speed) {
      this.speed = speed;
    }
  }
}
