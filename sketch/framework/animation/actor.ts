import { IScene } from '../controller/interfaces';
import { IActor, IShape, ISpriteAnimation } from './interfaces'

export default class Actor implements IActor {
    scene: IScene<any>;
    shape: IShape;
    spriteAnimations: Array<ISpriteAnimation>;
    private currentAnimationID: string;

    constructor(shape: IShape) {
        this.shape = shape;
        this.spriteAnimations = [];    
    }

    update(): void {
        
    }

    draw(): void {
        this.getCurrentAnimation().draw(this.shape);
    }

    sendKeyEvents(keyCode: number): void {
        if (keyCode === 0) {}
    }

    setSpriteAnimations(...animations: ISpriteAnimation[]): void {
        animations.forEach(animation => {
            if (this.spriteAnimations.indexOf(animation,0) > -1) {
                this.spriteAnimations.push(animation);
            }
        });
        this.currentAnimationID = this.spriteAnimations[0].id;
    }

    private getCurrentAnimation() : ISpriteAnimation {
        return this.spriteAnimations.find(a => a.id === this.currentAnimationID) as ISpriteAnimation;
    }
}