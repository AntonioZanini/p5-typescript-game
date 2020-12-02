import { ISceneController, IScene, IGameController, IResourceController, IKeyEventController }  from './interfaces';

export default class SceneController<T> implements ISceneController<T> {
    readonly resourceController: IResourceController;
    readonly keyEventController: IKeyEventController;
    readonly gameController : IGameController;
    private readonly scenesList : Array<IScene<T>>;
    private currentSceneID : T;
    private currentScene: IScene<T>;

    constructor(
        gameController: IGameController, 
        resourceController: IResourceController, 
        keyEventListener: IKeyEventController) {

        this.resourceController = resourceController;
        this.keyEventController = keyEventListener    
        this.gameController = gameController
        this.scenesList = [];
    }

    addScenes(...scenes: IScene<T>[]) : void 
    {
        scenes.forEach(scene => {
            if (!this.scenesList.find(s => s.getSceneID() === scene.getSceneID()))
            {
                scene.setSceneController(this);
                this.scenesList.push(scene);
            }
        });
    }
    
    private initializeScene() : void 
    {
        this.currentScene = this.getCurrentScene();
        if (!this.currentScene) { return; }
        this.currentScene.initialize();
    }
    
    private closeScene() : void
    {
        this.currentScene.close();
    }

    playScene() : void 
    {
        if (this.isSceneChanged()) { this.initializeScene(); }
        this.currentScene.playScene();
        if (this.isSceneChanged()) { this.closeScene(); }
    }

    changeScene(newSceneID: T): void
    {
        this.currentSceneID = newSceneID
    }

    private getCurrentScene(): IScene<T> 
    {
        return this.scenesList.find(s => s.getSceneID() === this.currentSceneID) as IScene<T>;
    }

    private isSceneChanged() : boolean 
    {
        return this.currentScene != this.getCurrentScene();
    }

}

