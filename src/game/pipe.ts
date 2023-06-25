import { GameObject } from "../api/object"
import { Trigger } from "../api/trigger"

export class Pipe {
    objects: GameObject[]
    deathTriggers: Trigger[]
    scoreTrigger: Trigger

    constructor(assets: {[index: string]: HTMLImageElement}, position: number[]) {
        this.objects = [
            new GameObject([position[0], 0], [80, position[1]], Math.PI, assets['pipe-body']), new GameObject([position[0], position[1]+120], [80, 800-position[1]], 0, assets['pipe-body']),
            new GameObject([position[0], position[1]-40], [80, 40], Math.PI, assets['pipe-head']), new GameObject([position[0], position[1]+120], [80, 40], 0, assets['pipe-head']),
        ]
        this.scoreTrigger = new Trigger([position[0]+40, position[1]], [80, 120], 'once')
        this.deathTriggers = [new Trigger([position[0], 0], [80, position[1]], 'once'), new Trigger([position[0], position[1]+120], [80, 800-position[1]], 'once')]
    }

    render(ctx: CanvasRenderingContext2D) {
        this.objects.forEach((object) => {
            object.render(ctx)
        })
    }
}