export class GameData {
  static readonly cWidth = 1200;
  static readonly cHeight = 600;

  static readonly padd_w = 10;
  static readonly padd_h = GameData.cHeight / 6;
  static readonly leftpadd_x = GameData.padd_w;
  static readonly rightpadd_x = GameData.cWidth - GameData.padd_w;
  static readonly padd_speed = 10;

  static readonly boundedPaddle = 15;
  static readonly max_score = 5;

  static readonly ball_rad = 10;
  static readonly ball_speed = 4;
  static readonly ball_max_speed = 20;
}
