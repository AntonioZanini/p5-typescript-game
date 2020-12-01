import { IBackgroundImage } from "../../framework/animation/interfaces";
import { IScene, ISceneController } from "../../framework/controller/interfaces";

export default class SceneBase<T> implements IScene<T> {
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
    initialize(): void {
        throw new Error("Method not implemented.");
    }
    playStartingAnimation(): void {
        throw new Error("Method not implemented.");
    }
    playScene(): void {
        throw new Error("Method not implemented.");
    }
    playEndingAnimation(): void {
        throw new Error("Method not implemented.");
    }
    close(): void {
        throw new Error("Method not implemented.");
    }

}