import { IBackgroundImage } from "../../framework/animation/interfaces";
import { IScene, ISceneController } from "../../framework/controller/interfaces";

export default abstract class SceneBase<T> implements IScene<T> {
    private id: T;
    private controller: ISceneController<T>;
    private backgroundImage: IBackgroundImage;
    private backgroundSound: p5.SoundFile;

    getSceneID(): T {
        return this.id;
    }
    
    setSceneController(controller: ISceneController<T>): void {
        this.controller = controller;
    }

    abstract initialize(): void;

    abstract playStartingAnimation(): void;

    abstract playScene(): void;

    abstract playEndingAnimation(): void;

    abstract close(): void;

}