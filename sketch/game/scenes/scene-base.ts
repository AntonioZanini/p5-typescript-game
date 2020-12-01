import { IScene, ISceneController } from "../../framework/controller/interfaces";

export default class SceneBase<T> implements IScene<T> {
    id: T;
    controller: ISceneController<T>;
    background: IBackground;
    
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