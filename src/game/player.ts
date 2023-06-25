import { GameObject } from "../api/object";

export class Player {
    position: number[]
    velocity: number[]
    alive: boolean
    state: number
    onGround: boolean
    sprite: GameObject

	constructor(asset: HTMLImageElement, position: number[]) {
		this.position = position;
		this.sprite = new GameObject(this.position, [40, 30], 0, asset);
        this.alive = true
        this.onGround = false
		this.velocity = [0,0];
        this.state = 0
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'red'
        this.sprite.render(ctx);
    }

	update(deltaTime: number, timeActive: number) {
        this.sprite.angle = this.velocity[1]/20;

        switch (this.state) {
            case(0):
                this.position[1] += Math.cos(timeActive/200)
                this.velocity[1] = Math.cos(timeActive/200)*4
                break;
            case(1):
                if (this.position[1] > 570) {
                    this.position[1] = 570;
                    this.alive = false
                    this.onGround = true
                    this.velocity[1] = 0;
                }
        
                if (this.position[1] < 0) {
                    this.position[1] = 0;
                    this.velocity[1] = 0;
                }
            
                this.position[0] += this.velocity[0];
                this.position[1] += this.velocity[1];
        
                this.velocity[1] += 0.02*deltaTime;
        
                if (this.velocity[1] > 8) {
                    this.velocity[1] = 8;
                }
                break;
        }
        
	}
}
