interface IResourcePackJSON {
    commonResources: Array<IImportResource>,
    spriteResources: Array<ISpriteImportResource>
}

interface IImportResource{
    name: string,
    path: string,
    type: string
}

interface ISpriteImportResource{
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

interface IRectangle {
    posX: number;
    posY: number;
    width: number;
    height: number;
}

interface IRecolor {
    sufix: string;
    colorName: ColorName;
}

interface ISpriteAnimation {
    suggestedWidth?: number;
    suggestedHeight?: number;
    draw(location: IRectangle): void;
    animate(): ISpriteAnimation;
    equals(animation: ISpriteAnimation): boolean;
}

interface IActorState {
    name: string,
    animation: ISpriteAnimation,
    nextState: IActorState,
}