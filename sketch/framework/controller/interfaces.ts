import { ShapeType, ColorName, ResourceType } from '../enums';

export interface IScoreItem {
    name: string,
    score: number
}

export interface IRecolor {
    sufix: string;
    colorName: ColorName;
}

export interface ISpriteImportResource {
    id: string,
    path: string,
    spriteWidth: number,
    spriteHeight: number,
    spriteNumber: number,
    spritePerRow: number,
    colisionType: ShapeType,
    colisionBox: Array<number>,
    recolors?: Array<IRecolor>
}

export interface IImportResource {
    id: string,
    path: string
}

export interface IResourceController {
    importFromJSON(path: string) : void,
    addResources(resourceType: ResourceType, ...resources: Array<IImportResource>): void,
    addSpriteResources(sprites: Array<ISpriteImportResource>): void,
    load(): void,
    getRecurso<T>(resourceType: ResourceType, resourceID: string): T
}

export interface IKeyEventListener {
    handleKeyEvent(arg0: number): void
}

export interface IKeyEventController {
    addListener(arg0: IKeyEventListener): void,
    removeListener(arg0: IKeyEventListener): void,
    sendKeyEvents(arg0: number): void
}

export interface IGameController {
    newGame(): void,
    getCurrentScore(): number,
    addScorePoints(arg0: number): void,
    removeScorePoints(arg0: number): void
    setScoreName(arg0: string): void 
}

export interface ISceneController<T> {
    keyEventController: IKeyEventController;
    resourceController: IResourceController
    gameController: IGameController,
    addScenes(...args: IScene<T>[]): void,
    playScene(): void,
    changeScene(arg0: T): void
}

export interface IScene<T> {
    getSceneID(): T,
    setSceneController(args: ISceneController<T>): void,
    initialize(): void,
    playStartingAnimation(): void,
    playScene(): void,
    playEndingAnimation(): void,
    close(): void
}