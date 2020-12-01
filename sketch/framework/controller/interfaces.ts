import { ISpriteAnimation } from '../animation/interfaces';
import { ShapeType, AvailableColor, ResourceType, ResourceContentType } from '../enums';

export interface IScoreItem {
    name: string,
    score: number
}

export interface IRecolor {
    sufix: string;
    colorName: AvailableColor;
}

export interface IResource {
    id: string;
    content: ResourceContentType;
}

export interface IResourcePackJSON {
    resources: Array<IImportResource>,
}

interface IImportResourceBase {
    id: string,
    type: ResourceType
}

export interface IImportResourceFile extends IImportResourceBase {
    path: string
}

export interface ISpriteImportResource extends IImportResourceFile {
    spriteWidth: number,
    spriteHeight: number,
    spriteNumber: number,
    spritePerRow: number,
    colisionType: ShapeType,
    colisionBox: Array<number>,
    recolors?: Array<IRecolor>
}

export interface IImportResourceText extends IImportResourceBase {
    content: string,
}

export type IImportResource = IImportResourceFile | IImportResourceText | ISpriteImportResource;

export interface IAnimationResourceLoader {
    load(resourceController: IResourceController) : Array<ISpriteAnimation>
}

export interface IResourceController {
    importFromJSON(path: string) : void,
    getColor(availableColor: AvailableColor) : p5.Color,
    addResources(...resources: Array<IImportResource>): void,
    load(animationResourceLoader?: IAnimationResourceLoader): void,
    getRecurso<T extends ResourceContentType>(resourceType: ResourceType, resourceID: string): T
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