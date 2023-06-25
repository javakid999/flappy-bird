import { Canvas } from "../api/canvas"
import { InputManager } from "../api/inputmanager"
import { GameObject, ScrollingBackground } from "../api/object"
import { Scene } from "../api/scene"
import { Trigger } from "../api/trigger"

export class ShopScene extends Scene {
    objects: Array<GameObject | ScrollingBackground>
    mouseTriggers: Array<Trigger>
    assets: {[index: string]: HTMLImageElement}
    canvas: Canvas

    returnButton: HTMLButtonElement;
    birds: HTMLImageElement[]
    costs: number[]

    constructor(canvas: Canvas, assets: {[index: string]: HTMLImageElement}) {
        super();

        this.canvas = canvas

        this.returnButton = document.createElement('button') as HTMLButtonElement;
        this.returnButton.textContent = 'RETURN'
        this.returnButton.className = 'ui-button'
        this.returnButton.id = 'return'
        this.returnButton.onclick = () => {this.reset(); this.canvas.scenes['game'].activate(); this.canvas.save(); this.canvas.activeScene = 'game'}
        document.getElementById('screen')!.appendChild(this.returnButton)

        this.objects = []
        this.mouseTriggers = []

        this.birds = [
            assets['bird-green'], assets['bird-red'], assets['bird-blue'], assets['bird-yellow'], assets['bird-purple'],
            assets['bird-checker'], assets['bird-robot'], assets['bird-totem'], assets['bird-rainbow1'], assets['bird-rainbow2'],
            assets['bird-rainbow3'], assets['bird-gold'], assets['bird-diamond'], assets['bird-emerald'], assets['bird-ruby'], assets['shop-icon'], assets['shop-icon-selected']
        ]
        this.costs = [
            0, 10, 10, 25, 25,
            35, 35, 35, 50, 50,
            75, 80, 90, 100, 150
        ]

        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 5; i++) {
                this.mouseTriggers.push(new Trigger([i*90+190, j*80+100], [50, 50], 'continuous'))
                if (canvas.selectedBird == i+j*5) {
                    this.objects.push(new GameObject([i*90+190, j*80+100], [50, 50], 0, assets['shop-icon-selected']))
                } else {
                    this.objects.push(new GameObject([i*90+190, j*80+100], [50, 50], 0, assets['shop-icon']))
                }
                
                if (canvas.purchasedBirds[i+j*5] == 1) {
                    this.objects.push(new GameObject([i*90+190, j*80+107], [50, 35], 0, this.birds[i+j*5]))
                } else {
                    this.objects.push(new GameObject([i*90+195, j*80+105], [40, 40], 0, assets['lock']))
                }
            }
        }

        this.objects.push(new ScrollingBackground([0,400], [64*6, 200], -0.003, assets['mountains']))
        this.objects.push(new ScrollingBackground([0,450], [48*6, 150], -0.01, assets['city']))
        this.objects.push(new ScrollingBackground([0,472], [65*6, 128], -0.03, assets['grass']))
        this.assets = assets
    }

    activate() {
        this.returnButton.style.display = 'block'
    }

    reset() {
        this.returnButton.style.display = 'none'
        this.timeActive = 0
    }

    render(canvas: Canvas) {
        this.objects.forEach((object) => {
            object.render(canvas.ctx, Math.floor(this.timeActive/6))
        })
        //this.mouseTriggers.forEach((trigger) => trigger.render(canvas.ctx))
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                canvas.ctx.fillStyle = 'black'
                canvas.ctx.fillText('Cost: ' + this.costs[i+j*5], i*90+190, j*80+165)
            }
        }
    }

    update(deltaTime: number) {
        super.update(deltaTime)
        this.objects.forEach((object) => object.update(deltaTime))
    }

    updateInput(inputManager: InputManager) {
        super.updateInput(inputManager);
        if (inputManager.clicking) {
            this.mouseTriggers.forEach((trigger, i) => {
                trigger.collideMouse(inputManager.mousePos)
                if (trigger.triggered) {
                    if (this.canvas.purchasedBirds[i] == 1) {
                        this.objects[this.canvas.selectedBird*2].image = this.birds[15]
                        this.canvas.selectedBird = i
                        this.objects[i*2].image = this.birds[16]
                    } else {
                        if (this.canvas.coins >= this.costs[i]) {
                            this.canvas.purchasedBirds[i] = 1
                            this.canvas.coins -= this.costs[i]
                            this.objects[this.canvas.selectedBird*2].image = this.birds[15]
                            this.canvas.selectedBird = i
                            this.objects[i*2].image = this.birds[16]
                            this.objects[this.canvas.selectedBird*2+1].image = this.birds[i]
                            this.objects[this.canvas.selectedBird*2+1].size = [50,35]
                            this.objects[this.canvas.selectedBird*2+1].position[0] -= 5
                            this.objects[this.canvas.selectedBird*2+1].position[1] += 2
                            document.getElementById('coins')!.textContent = "Coins: " + this.canvas.coins
                            this.canvas.save()
                        }
                    }
                }
            })
        }
    }
}