export class InputManager {
    keys: {[index: string]: boolean}
    clicking: boolean
    mousePos: number[]
    mouseSensitivity: number
    constructor() {     
        window.addEventListener('mousemove', this.mousemoveListener.bind(this));
        window.addEventListener('keydown', this.keydownListener.bind(this));
        window.addEventListener('keyup', this.keyupListener.bind(this));
        window.addEventListener('mousedown', this.mousedownListener.bind(this));
        this.clicking = false
        this.keys = {}
        this.mousePos = [0,0]
        this.mouseSensitivity = 0.002
    }

    mousemoveListener(e: MouseEvent) {
        this.mousePos = [e.x, e.y]
    }

    keydownListener(e: KeyboardEvent) {
        switch (e.key) {
            case (' '):
                if (!e.repeat) {
                    this.keys[' '] = true;
                }
                break;
        }
    }

    keyupListener(_e: KeyboardEvent) {

    }

    mousedownListener() {
       this.clicking = true
    }

    updateInput() {
        this.clicking = false;
        this.keys[' '] = false;
    }
}