import { ISpriteSheet, ICoord, IShape, ISpriteFrame } from './interfaces'
import { ShapeType } from '../enums'

class SpriteSheet implements ISpriteSheet {
    id: string;
    spriteSheet: p5.Image;
    spriteWidth: number;
    spriteHeight: number;
    spriteNumber: number;
    spritesByRow: number;
    private frameArray: Array<ICoord>;

    constructor(
        id: string,
        spriteSheet: p5.Image,
        spriteWidth: number,
        spriteHeight: number,
        spriteNumber: number,
        spritesByRow: number,
    ) {
        this.id = id;
        this.spriteSheet = spriteSheet;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spriteNumber = spriteNumber;
        this.spritesByRow = spritesByRow
    }

    drawSprite(spriteFrame: ISpriteFrame, location: IShape): void {
        const hModifier = spriteFrame.hReverse ? -1 : 1;
        const vModifier = spriteFrame.vReverse ? -1 : 1;
        push();
        scale(hModifier, vModifier);
        image(
            this.spriteSheet,
            location.xPos * hModifier,
            location.yPos * vModifier,
            location.width,
            location.height,
            this.frameArray[spriteFrame.spriteNumber].xPos,
            this.frameArray[spriteFrame.spriteNumber].yPos,
            this.spriteWidth,
            this.spriteHeight
        );
        scale(1, 1);
        pop();
    }

    drawCollisionShape(spriteFrame: ISpriteFrame, collisionShape: IShape) {
        const hModifier = spriteFrame.hReverse ? -1 : 1;
        const vModifier = spriteFrame.vReverse ? -1 : 1;
        if (collisionShape.shapeType = ShapeType.circle) {
            noFill();
            circle(
                collisionShape.xPos * hModifier,
                collisionShape.yPos * vModifier,
                collisionShape.diameter
            );
        }
    }
}


