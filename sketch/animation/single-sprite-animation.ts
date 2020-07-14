import { IRectangle, ISpriteAnimation } from '../interfaces';
import { Sprite} from './sprite';

export class SingleSpriteAnimation implements ISpriteAnimation
{
    protected currentFrame: number = 0;
    protected delay: number = 0;
    public sprite: Sprite;
    public frameNumberList: Array<number>;
    public loop: boolean;
    public frameDelay: number;
    public hFlipped: boolean;
    public suggestedWidth?: number;
    public suggestedHeight?: number;

    constructor(
        sprite: Sprite,
        frameNumberList: Array<number>,
        loop: boolean,
        frameDelay: number = 0,
        hFlipped: boolean = false,
        suggestedWidth?: number,
        suggestedHeight?: number
    ) {
        this.delay = this.frameDelay;
        this.sprite = sprite;
        this.frameNumberList = frameNumberList;
        this.loop = loop;
        this.frameDelay = frameDelay;
        this.hFlipped = hFlipped;
        this.suggestedWidth = suggestedWidth;
        this.suggestedHeight = suggestedHeight;
    }

    draw(location: IRectangle) {
        this.sprite.drawFrame(
            this.frameNumberList[this.currentFrame], 
            location,
            this.hFlipped
        );
        if (this.currentFrame === this.frameNumberList.length - 1 && 
            this.loop == false) {
            return;
        }

        if (this.delay <= 0) {
            this.currentFrame++;
            this.delay = this.frameDelay;
            if (this.currentFrame >= this.frameNumberList.length) {
                this.currentFrame = (this.loop) ? 0 : this.currentFrame - 1;
            }
        } else {
            this.delay--;
        }
    }

    animate(): ISpriteAnimation {
        return new SingleSpriteAnimation(
            this.sprite,
            this.frameNumberList,
            this.loop,
            this.frameDelay,
            this.hFlipped,
            this.suggestedWidth,
            this.suggestedHeight

        );
    }

    equals(animation: ISpriteAnimation) {
        if (!(animation instanceof SingleSpriteAnimation)) { return false; }
        if (this.sprite === animation.sprite &&
            this.frameNumberList === animation.frameNumberList &&
            this.loop === animation.loop &&
            this.frameDelay === animation.frameDelay &&
            this.hFlipped === animation.hFlipped &&
            this.suggestedWidth == animation.suggestedWidth &&
            this.suggestedHeight == animation.suggestedHeight) {
                return true;
        }
        return false;
    }
}