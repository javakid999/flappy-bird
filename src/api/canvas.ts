import { GameScene } from "../scenes/gamescene";
import { ShopScene } from "../scenes/shopscene";
import { InputManager } from "./inputmanager";
import { GameObject, ScrollingBackground } from "./object";
import { Scene } from "./scene";

export class Canvas {
    assets: {[index: string]: HTMLImageElement}
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D
    globalObjects: Array<GameObject | ScrollingBackground>
    scenes: {[index: string]: Scene}
    activeScene: string

    coins: number
    selectedBird: number
    purchasedBirds: number[]

    constructor(dimensions: number[], assets: {[index: string]: HTMLImageElement}) {
        this.assets = assets;
        this.element = document.createElement('canvas') as HTMLCanvasElement;

        this.element.width = dimensions[0]
        this.element.height = dimensions[1]
        this.element.id = 'game-canvas';
        this.ctx = this.element.getContext('2d')!;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.font = '15px arial'
        document.getElementById('screen')!.appendChild(this.element);
        this.element.appendChild

        this.selectedBird = 0
        this.purchasedBirds = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.coins = 0
        
        this.load()

        this.scenes = {}
        this.activeScene = 'game'
        this.globalObjects = []
    }

    save() {
        localStorage.setItem("coins", this.coins.toString());
        localStorage.setItem("selectedBird", this.selectedBird.toString());
        localStorage.setItem("purchasedbirds", JSON.stringify(this.purchasedBirds));
    }

    load() {
        const coins = localStorage.getItem('coins')
        if (coins) this.coins = parseFloat(coins);
        const bird = localStorage.getItem('selectedBird')
        if (bird) this.selectedBird = parseFloat(bird);
        const birds = localStorage.getItem('purchasedBirds')
        if (birds) this.purchasedBirds = JSON.parse(birds);
    }

    initScenes() {
        this.scenes['game'] = new GameScene(this, this.assets)
        this.scenes['shop'] = new ShopScene(this, this.assets)
    }

    render() {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  
        this.ctx.fillStyle = '#77bbff';
        this.ctx.fillRect(0, 0, this.element.width, this.element.height);
          
        for (let item of this.globalObjects) {
            item.render(this.ctx);
        }

        switch(this.activeScene) {
            case('title'):
                break;
            case('shop'):
                this.scenes['shop'].render(this);
                break;
            case('game'):
                this.scenes['game'].render(this);
                break;
        }
    }

    update(inputManager: InputManager, deltaTime: number) {
        switch(this.activeScene) {
            case('title'):
                break;
            case('shop'):
            this.scenes['shop'].updateInput(inputManager);
            this.scenes['shop'].update(deltaTime)
            break;
            case('game'):
                this.scenes['game'].updateInput(inputManager);
                this.scenes['game'].update(deltaTime)
                break;
        }
        
    }
}