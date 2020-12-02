import { IBackgroundImage } from "../../framework/animation/interfaces";
import { IScene, ISceneController } from "../../framework/controller/interfaces";

export default abstract class SceneBase<T> implements IScene<T> {
    protected id: T;
    protected controller: ISceneController<T>;
    protected backgroundImage: IBackgroundImage;
    protected backgroundSound: p5.SoundFile;

    getSceneID(): T {
        return this.id;
    }
    
    setSceneController(controller: ISceneController<T>): void {
        this.controller = controller;
    }

    abstract initialize(): void;

    abstract playScene(): void;

    abstract close(): void;

}