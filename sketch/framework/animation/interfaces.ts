import { IScene } from '../controller/interfaces';
import { ShapeType } from '../enums'

export interface ISpriteSheet {
    id: string;
    spriteSheet: p5.Image;
    spriteWidth: number;
    spriteHeight: number;
    spriteNumber: number;
    spritesByRow: number;
    drawSprite(spriteFrame: ISpriteFrame, location: IShape): void;
    drawCollisionShape(spriteFrame: ISpriteFrame, location: IShape): void;
}

export interface ICoord {
    xPos: number,
    yPos: number
}

export interface ISpriteAnimation {
    id: string;
    defaultWidth: number;
    defaultHeight: number;
    frameDelay: number;
    collisionShape: IShape;
    draw(location: IShape): void;
    animate(): boolean;
    equals(animation: ISpriteAnimation): boolean;
}

export interface ISpriteFrame {
    spriteSheetIndex: number,
    spriteNumber: number,
    hReverse: boolean,
    vReverse: boolean
}

export interface IShape {
    shapeType: ShapeType,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    diameter: number,
    globalScale: number
}

export interface IActor {
    scene: IScene<any>;
    shape: IShape;
    setSpriteAnimations(...animations: ISpriteAnimation[]): void;
    update(): void;
    draw(): void;
    sendKeyEvents(keyCode: number): void;
}