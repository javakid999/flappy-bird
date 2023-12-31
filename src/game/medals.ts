import { Easing } from "../api/easing";
import { GameObject, GameObjectAnimated } from "../api/object";
import { ParticleSystem } from "../api/particle";

export class MedalTable {
    board: GameObject
    medals: { [index: string]: GameObject }
    shine: GameObjectAnimated
    particles: { [index: string]: ParticleSystem }
    medalTime: number

    constructor(assets: {[index: string]: HTMLImageElement}) {
        this.medalTime = 0
        this.board = new GameObject([(800-256)/2, -192], [256, 192], 0, assets['medals'])
        this.medals = {
            bronze: new GameObject([284-18+12,96-18], [18*6, 18*6], 1, assets['bronze']),
            silver: new GameObject([284-18+20*4,96-18], [18*6, 18*6], 1, assets['silver']),
            gold: new GameObject([284-18+40*4,96-18], [18*6, 18*6], 1, assets['gold']),
            diamond: new GameObject([272-16+12,96-16], [18*8, 18*8], 1, assets['diamond']),
            emerald: new GameObject([272-16+12+20*4,96-16], [18*8, 18*8], 1, assets['emerald']),
            ruby: new GameObject([272+12-16+40*4,96-16], [18*8, 18*8], 1, assets['ruby'])
        }
        this.particles = {
            bronze: new ParticleSystem([284+30,96+30], [10,10], 15, [-0.1,0.1, -0.4,-0.2, -0.01, 0.01], 'brown'),
            silver: new ParticleSystem([284+18+20*4,96+30], [10,10], 15, [-0.1,0.1, -0.4,-0.2, -0.01, 0.01], 'grey'),
            gold: new ParticleSystem([284+18+40*4,96+30], [10,10], 15, [-0.1,0.1, -0.4,-0.2, -0.01, 0.01], 'gold'),
            diamond: new ParticleSystem([272+12+18,96+30], [10,10], 40, [-0.2,0.2, -0.4,0, -0.01, 0.01], 'aqua'),
            emerald: new ParticleSystem([272+12+18+20*4,96+30], [10,10], 40, [-0.2,0.2, -0.4,0, -0.01, 0.01], '#30ff30'),
            ruby: new ParticleSystem([272+12+18+40*4,96+30], [10,10], 40, [-0.2,0.2, -0.4,0, -0.01, 0.01], 'red')
        }
        this.shine = new GameObjectAnimated([300,300], [18*4,18*4], 0, assets['shine'], [18,18])
    }

    render(ctx: CanvasRenderingContext2D, score: number) {
        this.board.render(ctx)
        for (let particle in this.particles) {this.particles[particle].render(ctx)}
        if (this.medalTime > 2000 && score >= 10) {
            this.medals['bronze'].render(ctx)
            this.medals['bronze'].angle = Easing.quadratic(1, 0, Math.min((this.medalTime-2000)/500,1))
            this.medals['bronze'].size = [Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-2000)/500,1)), Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-2000)/500,1))]
            this.medals['bronze'].position = [Easing.quadratic(284-18, 272+12, Math.min((this.medalTime-2000)/500,1)), Easing.quadratic(96-18, 96, Math.min((this.medalTime-2000)/500,1))]
        }
        if (this.medalTime > 3000 && score >= 20) {
            this.medals['silver'].render(ctx)
            this.medals['silver'].angle = Easing.quadratic(1, 0, Math.min((this.medalTime-3000)/500,1))
            this.medals['silver'].size = [Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-3000)/500,1)), Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-3000)/500,1))]
            this.medals['silver'].position = [Easing.quadratic(284-18+20*4, 284+20*4, Math.min((this.medalTime-3000)/500,1)), Easing.quadratic(96-18, 96, Math.min((this.medalTime-3000)/500,1))]
        }
        if (this.medalTime > 4000 && score >= 30) {
            this.medals['gold'].render(ctx)
            this.medals['gold'].angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-4000)/500,1))
            this.medals['gold'].size =     [Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-4000)/500,1)), Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-4000)/500,1))]
            this.medals['gold'].position = [Easing.quadratic(284-18+40*4, 284+40*4, Math.min((this.medalTime-4000)/500,1)), Easing.quadratic(96-18, 96, Math.min((this.medalTime-4000)/500,1))]
        }
        if (this.medalTime > 5000 && score >= 50) {
            this.medals['diamond'].render(ctx)
            this.medals['diamond'].angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-5000)/250,1))
            this.medals['diamond'].size =     [Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-5000)/250,1)), Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-5000)/250,1))]
            this.medals['diamond'].position = [Easing.quadratic(272-36+12, 272-18+12, Math.min((this.medalTime-5000)/250,1)), Easing.quadratic(96-36, 96-18, Math.min((this.medalTime-5000)/250,1))]
        }
        if (this.medalTime > 5500 && score >= 75) {
            this.medals['emerald'].render(ctx)
            this.medals['emerald'].angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-5500)/250,1))
            this.medals['emerald'].size =     [Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-5500)/250,1)), Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-5500)/250,1))]
            this.medals['emerald'].position = [Easing.quadratic(272-36+12+20*4, 272-18+12+20*4, Math.min((this.medalTime-5500)/250,1)), Easing.quadratic(96-36, 96-18, Math.min((this.medalTime-5500)/250,1))]
        }
        if (this.medalTime > 6000 && score >= 100) {
            this.medals['ruby'].render(ctx)
            this.medals['ruby'].angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-6000)/250,1))
            this.medals['ruby'].size =     [Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-6000)/250,1)), Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-6000)/250,1))]
            this.medals['ruby'].position = [Easing.quadratic(272-36+12+40*4, 272-18+12+40*4, Math.min((this.medalTime-6000)/250,1)), Easing.quadratic(96-36, 96-18, Math.min((this.medalTime-6000)/250,1))]
        }
        this.board.position[1] = Easing.cosine(-192, 0, Math.min(this.medalTime/1500,1))

        if (score >= 10 && score < 20 && this.medalTime > 2000) {
            this.shine.render(ctx, Math.floor(this.medalTime/20))
            this.shine.angle =     Easing.quadratic(1, 0, Math.min((this.medalTime-2000)/500,1))
            this.shine.size =     [Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-2000)/500,1)), Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-2000)/500,1))]
            this.shine.position = [Easing.quadratic(284-18, 272+12, Math.min((this.medalTime-2000)/500,1)), Easing.quadratic(96-18, 96, Math.min((this.medalTime-2000)/500,1))]
        } else if (score >= 20 && score < 30 && this.medalTime > 3000) {
            this.shine.render(ctx, Math.floor(this.medalTime/20))
            this.shine.angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-3000)/500,1))
            this.shine.size =     [Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-3000)/500,1)), Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-3000)/500,1))]
            this.shine.position = [Easing.quadratic(284-18+20*4, 284+20*4, Math.min((this.medalTime-3000)/500,1)), Easing.quadratic(96-18, 96, Math.min((this.medalTime-3000)/500,1))]
        } else if (score >= 30 && score < 50 && this.medalTime > 4000) {
            this.shine.render(ctx, Math.floor(this.medalTime/20))
            this.shine.angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-4000)/500,1))
            this.shine.size =     [Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-4000)/500,1)), Easing.quadratic(18*6, 18*4, Math.min((this.medalTime-4000)/500,1))]
            this.shine.position = [Easing.quadratic(284-18+40*4, 284+40*4, Math.min((this.medalTime-4000)/500,1)), Easing.quadratic(96-18, 96, Math.min((this.medalTime-4000)/500,1))]
        } else if (score >= 50 && score < 75 && this.medalTime > 5000) {
            this.shine.render(ctx, Math.floor(this.medalTime/20))
            this.shine.angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-5000)/250,1))
            this.shine.size =     [Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-5000)/250,1)), Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-5000)/250,1))]
            this.shine.position = [Easing.quadratic(272-36+12, 272-18+12, Math.min((this.medalTime-5000)/250,1)), Easing.quadratic(96-36, 96-18, Math.min((this.medalTime-5000)/250,1))]
        } else if (score >= 75 && score < 100 && this.medalTime > 5500) {
            this.shine.render(ctx, Math.floor(this.medalTime/20))
            this.shine.angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-5500)/250,1))
            this.shine.size =     [Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-5500)/250,1)), Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-5500)/250,1))]
            this.shine.position = [Easing.quadratic(272-36+12+20*4, 272-18+12+20*4, Math.min((this.medalTime-5500)/250,1)), Easing.quadratic(96-36, 96-18, Math.min((this.medalTime-5500)/250,1))]
        } else if (score >= 100 && this.medalTime > 6000) {
            this.shine.render(ctx, Math.floor(this.medalTime/20))
            this.shine.angle =    Easing.quadratic(1, 0, Math.min((this.medalTime-6000)/250,1))
            this.shine.size =     [Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-6000)/250,1)), Easing.quadratic(18*8, 18*6, Math.min((this.medalTime-6000)/250,1))]
            this.shine.position = [Easing.quadratic(272-36+12+40*4, 272-18+12+40*4, Math.min((this.medalTime-6000)/250,1)), Easing.quadratic(96-36, 96-18, Math.min((this.medalTime-6000)/250,1))]
        }
    }

    update(deltaTime: number, score: number) {
        if (this.medalTime > 2500 && score >= 10) this.particles['bronze'].activate()
        if (this.medalTime > 3500 && score >= 20) this.particles['silver'].activate()
        if (this.medalTime > 4500 && score >= 30) this.particles['gold'].activate()
        if (this.medalTime > 5250 && score >= 50) this.particles['diamond'].activate()
        if (this.medalTime > 5750 && score >= 75) this.particles['emerald'].activate()
        if (this.medalTime > 6250 && score >= 100) this.particles['ruby'].activate()
        for (let particle in this.particles) {this.particles[particle].update(deltaTime)}
    }
}