import { ISpriteAnimation, IShape, ISpriteFrame, ISpriteSheet } from './interfaces'

class SpriteAnimation implements ISpriteAnimation {
    readonly id: string;
    frameDelay: number;
    defaultWidth: number;
    defaultHeight: number;
    collisionShape: IShape;
    private spriteSheets: Array<ISpriteSheet>;
    private spriteFrames: Array<ISpriteFrame>;
    private currentSpriteFrameIndex: number;
    private currentDelay: number;

    constructor(
        id: string, 
        collisionShape: IShape, 
        frameDelay: number = 0,
        defaultWidth: number = 0,
        defaultHeight: number = 0
        ) {
        this.id = id;
        this.frameDelay = frameDelay;
        this.collisionShape = collisionShape;
        this.defaultWidth = defaultWidth;
        this.defaultHeight = defaultHeight;
    }

    draw(location: IShape): void {
        const currentSpriteSheet = this.getCurrentSpriteSheet();
        const currentSpriteFrame = this.spriteFrames[this.currentSpriteFrameIndex];
        currentSpriteSheet.drawSprite(currentSpriteFrame, location);
        if (showColisionBox) {
            currentSpriteSheet.drawCollisionShape(currentSpriteFrame, this.collisionShape);
        }
    }

    animate(): boolean {
        if (this.currentDelay > 0) 
        {
            this.currentDelay--;
        } 
        else 
        {
            this.currentSpriteFrameIndex++;
            this.currentDelay = this.frameDelay;
            if (this.currentSpriteFrameIndex >= this.getCurrentSpriteSheet().spriteNumber) {
                this.currentSpriteFrameIndex = 0;
                return true;
            }
        }
        return false;
    }

    equals(animation: ISpriteAnimation): boolean {
        return this.id === animation.id
    }
    
    private getCurrentSpriteSheet() : ISpriteSheet {
        return this.spriteSheets[this.spriteFrames[this.currentSpriteFrameIndex].spriteSheetIndex];
    }

}