import { IKeyEventController, IKeyEventListener } from './interfaces';
export default class keyEventController implements IKeyEventController {
    private keyListeners: Array<IKeyEventListener>;

    constructor() {
        this.keyListeners = [];
    }

    addListener(keyListener: IKeyEventListener): void {
        const index : number = this.keyListeners.indexOf(keyListener);
        if (index === -1) {
            this.keyListeners.push(keyListener);
        }
    }

    removeListener(keyListener: IKeyEventListener): void {
        const index : number = this.keyListeners.indexOf(keyListener);
        if (index > -1) {
            this.keyListeners.splice(index, 1);
        }
    }

    sendKeyEvents(keyCode: number): void {
        this.keyListeners.forEach(listeners => listeners.handleKeyEvent(keyCode))
    }
}