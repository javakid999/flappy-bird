import { Canvas } from "../api/canvas";
import { InputManager } from "../api/inputmanager";
import { GameObject, ScrollingBackground } from "../api/object";
import { Scene } from "../api/scene";
import { MedalTable } from "../game/medals";
import { Pipe } from "../game/pipe";
import { Player } from "../game/player";

export class GameScene extends Scene {
    player: Player
    objects: Array<GameObject | ScrollingBackground>
    pipes: Array<Pipe>
    assets: {[index: string]: HTMLImageElement}
    score: number
    medalTable: MedalTable
    pipeTimer: number
    canvas: Canvas

    coinCounter: HTMLDivElement;
    scoreCounter: HTMLDivElement;
    restartButton: HTMLButtonElement;
    shopButton: HTMLButtonElement;

    constructor(canvas: Canvas, assets: {[index: string]: HTMLImageElement}) {
        super();

        this.canvas = canvas
        this.coinCounter = document.createElement('div') as HTMLDivElement;
        this.scoreCounter = document.createElement('div') as HTMLDivElement;
        this.coinCounter.textContent = "Coins: " + canvas.coins
        this.scoreCounter.textContent = 'Score: 0'
        this.coinCounter.className = 'ui-text'
        this.scoreCounter.className = 'ui-text'
        this.coinCounter.id = 'coins'
        this.scoreCounter.id = 'score'
        this.scoreCounter.style.display = 'none'
        this.coinCounter.blur()
        this.scoreCounter.blur()
        document.body.appendChild(this.coinCounter)
        document.body.appendChild(this.scoreCounter)
        this.scoreCounter.style.display = 'block'

        this.shopButton = document.createElement('button') as HTMLButtonElement;
        this.shopButton.textContent = 'SHOP'
        this.shopButton.className = 'ui-button'
        this.shopButton.onclick = () => {this.reset(); this.scoreCounter.style.display = 'none'; this.canvas.scenes['shop'].activate(); this.canvas.save(); this.canvas.activeScene = 'shop'}
        document.getElementById('screen')!.appendChild(this.shopButton)

        this.restartButton = document.createElement('button') as HTMLButtonElement;
        this.restartButton.textContent = 'RESTART'
        this.restartButton.className = 'ui-button'
        this.restartButton.onclick = () => {this.reset(); this.canvas.save()}
        document.getElementById('screen')!.appendChild(this.restartButton)

        this.objects = []
        this.pipes = []
        this.objects.push(new ScrollingBackground([0,400], [64*6, 200], -0.01, assets['mountains']))
        this.objects.push(new ScrollingBackground([0,450], [48*6, 150], -0.03, assets['city']))
        this.objects.push(new ScrollingBackground([0,472], [65*6, 128], -0.1, assets['grass']))
        this.assets = assets
        this.medalTable = new MedalTable(assets)
        this.pipeTimer = 0;
        this.score = 0
        this.player = new Player(assets['bird-green'], [400,300])

        const birds = [
            this.canvas.assets['bird-green'], this.canvas.assets['bird-red'], this.canvas.assets['bird-blue'], this.canvas.assets['bird-yellow'], this.canvas.assets['bird-purple'],
            this.canvas.assets['bird-checker'], this.canvas.assets['bird-robot'], this.canvas.assets['bird-totem'], this.canvas.assets['bird-rainbow1'], this.canvas.assets['bird-rainbow2'],
            this.canvas.assets['bird-rainbow3'], this.canvas.assets['bird-gold'], this.canvas.assets['bird-diamond'], this.canvas.assets['bird-emerald'], this.canvas.assets['bird-ruby'], this.canvas.assets['shop-icon'], this.canvas.assets['shop-icon-selected']
        ]

        this.player.sprite.image = birds[this.canvas.selectedBird]
    }

    activate() {
        this.coinCounter.style.display = 'block'
        this.scoreCounter.style.display = 'block'
        
        const birds = [
            this.canvas.assets['bird-green'], this.canvas.assets['bird-red'], this.canvas.assets['bird-blue'], this.canvas.assets['bird-yellow'], this.canvas.assets['bird-purple'],
            this.canvas.assets['bird-checker'], this.canvas.assets['bird-robot'], this.canvas.assets['bird-totem'], this.canvas.assets['bird-rainbow1'], this.canvas.assets['bird-rainbow2'],
            this.canvas.assets['bird-rainbow3'], this.canvas.assets['bird-gold'], this.canvas.assets['bird-diamond'], this.canvas.assets['bird-emerald'], this.canvas.assets['bird-ruby'], this.canvas.assets['shop-icon'], this.canvas.assets['shop-icon-selected']
        ]

        this.player.sprite.image = birds[this.canvas.selectedBird]
    }

    reset() {
        this.shopButton.style.display = 'none'
        this.restartButton.style.display = 'none'
        this.medalTable.medalTime = 0
        this.pipes = []
        this.player = new Player(this.player.sprite.image, [400,300])
        this.score = 0
        this.timeActive = 0
        this.scoreCounter.textContent = "Score: " + this.score
    }

    render(canvas: Canvas) {
        this.objects.forEach((object) => {
            object.render(canvas.ctx, Math.floor(this.timeActive/6))
        })
        this.pipes.forEach((pipe) => {
            if (pipe.scoreTrigger.triggered) {
                this.score += 1;
                canvas.coins += 1
                this.scoreCounter.textContent = "Score: " + this.score
                this.coinCounter.textContent = "Coins: " + canvas.coins
            }
            pipe.render(canvas.ctx)
        })
        this.player.render(canvas.ctx)
        if (this.player.onGround) {
            this.medalTable.render(canvas.ctx, this.score)
        }
        if (this.player.state == 0) {
            canvas.ctx.fillStyle = 'white'
            canvas.ctx.fillText('Press space or click to start...', 330, 250)
        }
    }

    update(deltaTime: number) {
        super.update(deltaTime)
        this.player.update(deltaTime, this.timeActive)
        this.objects.forEach((object) => {
            if (this.player.alive) object.update(deltaTime)
        })
        this.pipes.forEach((pipe) => {
            pipe.deathTriggers.forEach((deathTrigger) => deathTrigger.collideObject(this.player.sprite))
            pipe.scoreTrigger.collideObject(this.player.sprite)
            if (this.player.alive && this.player.state == 1) {
                pipe.objects.forEach((object) => {
                    object.position[0] -= 0.15*deltaTime
                })
                pipe.deathTriggers.forEach((trigger) => trigger.position[0] -= 0.15*deltaTime)
                pipe.scoreTrigger.position[0] -= 0.15*deltaTime
            }
            pipe.deathTriggers.forEach((deathTrigger) => {if (deathTrigger.triggered) {this.player.alive = false; this.canvas.save()} })
        })
        this.medalTable.update(deltaTime, this.score)
        if (this.pipeTimer > 2500) {
            if (this.player.alive && this.player.state == 1) this.pipes.push(new Pipe(this.assets, [800, Math.floor(Math.random() * 300)+100]))
            this.pipeTimer = 0
        }
        if (this.player.alive) this.pipeTimer += deltaTime
        if (this.player.onGround) {this.medalTable.medalTime += deltaTime; this.restartButton.style.display = 'block'; this.shopButton.style.display = 'block'}
    }

    updateInput(inputManager: InputManager) {
        super.updateInput(inputManager);
        if ((inputManager.keys[' '] || inputManager.clicking) && this.player.alive) {
            this.player.velocity[1] = -6.5
            if (this.player.state == 0) this.player.state = 1
        }
        
    }
}