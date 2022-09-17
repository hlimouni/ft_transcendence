import {GameData} from './constant'

export class Paddle {
    private x: number;
    private y: number;
    private padd_speed: number;
    
    constructor(paddle_X: number) {
        this.x = paddle_X;
        this.y = GameData.cHeight/2 - GameData.padd_h/2;
        this.padd_speed = 0;
    }

    public get_PaddleY(): number {
        return this.y;
    }
    
    public set_PaddleY(y: number): void {
        this.y = y;
    }

    public get_PaddleX(): number {
        return this.x;
    }
    public getpadd_speed(): number {
        return this.padd_speed;
    }
    public setpadd_speed(paddleSpeed: number) {
        this.padd_speed = paddleSpeed;
    }

    public movePaddle(): void {
        if (this.padd_speed === 0) return;

        this.y += this.padd_speed;
        
        if (this.y < GameData.boundedPaddle) {
            this.padd_speed = 0;
            this.y = GameData.boundedPaddle - 5;
            return;
        }
        if (this.y + GameData.padd_h  > GameData.cHeight - GameData.boundedPaddle) {
            this.padd_speed = 0;
            this.y = GameData.cHeight - GameData.padd_h - GameData.boundedPaddle + 5;
            return;
        }
    }

    public up(key: string): void {
        if (key === 'down') {
            this.padd_speed = 0;
            this.padd_speed -= GameData.padd_speed;
            
        }
        else {
            this.padd_speed = 0;
        }
    }
    
    public down(key: string): void {
        if (key === 'down') {
            this.padd_speed = 0;
            this.padd_speed += GameData.padd_speed;
        }
        else {
            this.padd_speed = 0;
        }
    }
}