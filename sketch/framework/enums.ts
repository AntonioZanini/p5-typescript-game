import { ISpriteSheet } from "./animation/interfaces";

export type AvailableColor = 'blue' | 'green' | 'red' | 'yellow' | 'orange' | 'pink' | 'transparent';
export type ResourceContentType = p5.Image | p5.Font | p5.SoundFile | ISpriteSheet | string;
export enum ShapeType {
    rect,
    circle
}

export enum ResourceType {
    image = "Image",
    spriteSheet = "SpriteSheet",
    sound = "Sound",
    font = "Font",
    text = "Text"
}

export enum ModifierType {
    Sum,
    Multiply
}


