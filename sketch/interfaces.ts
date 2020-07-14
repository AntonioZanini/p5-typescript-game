export interface IResourcePackJSON {
    commonResources: Array<IImportResource>,
    spriteResources: Array<ISpriteImportResource>
}

export interface IImportResource{
    name: string,
    path: string,
    type: string
}

export interface ISpriteImportResource{
    name: string,
    path: string,
    spriteWidth: number,
    spriteHeight: number,
    spriteNumber: number,
    spritePerRow: number,
    tipoColisao: ColisionType,
    caixaColisao: Array<number>,
    recolors?: Array<IRecolor>
}

export interface IRectangle {
    posX: number;
    posY: number;
    width: number;
    height: number;
}

export interface IRecolor {
    sufix: string;
    colorName: ColorName;
}

export interface ISpriteAnimation {
    suggestedWidth?: number;
    suggestedHeight?: number;
    draw(location: IRectangle): void;
    animate(): ISpriteAnimation;
    equals(animation: ISpriteAnimation): boolean;
}

export interface IMoveAnimations {
    up?: ISpriteAnimation,
    down?: ISpriteAnimation,
    left?: ISpriteAnimation,
    right?: ISpriteAnimation
}

export interface IDirectionalControls {
    up?: Array<number>,
    down?: Array<number>,
    left?: Array<number>,
    right?: Array<number>,
}

export interface IActorState {
    name: string,
    animation: ISpriteAnimation,
    nextState: IActorState,
}