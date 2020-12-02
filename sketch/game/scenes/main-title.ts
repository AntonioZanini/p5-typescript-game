import { AvailableScenes, SceneState } from "../../enums";
import BackgroundImage from "../../framework/animation/background-image";
import { getSumModifier } from "../../framework/animation/tools";
import { IKeyEventListener, IScene } from "../../framework/controller/interfaces";
import { ResourceType } from "../../framework/enums";
import SceneBase from "./scene-base"

export default class MainTitle extends SceneBase<AvailableScenes> 
    implements IScene<AvailableScenes>, IKeyEventListener {
    private state : SceneState = SceneState.intro;
    private currentDirection: number = 0;
    private speed: number = 5;

    constructor() {
        super();
        this.id = "main_title";
    }

    handleKeyEvent(keyCode: number): void {
        switch (keyCode) {
            case LEFT_ARROW:
                
                break;
            default:
                break;
        }
    }

    initialize(): void {
        this.backgroundImage = new BackgroundImage("main-background");
        this.backgroundSound = this.controller.resourceController.getResource<p5.SoundFile>(ResourceType.sound, "main-theme");
        this.backgroundSound.loop();
    }

    private executeCommon(): void {
        this.backgroundImage.update(getSumModifier(this.currentDirection * this.speed));
        this.backgroundImage.draw();
    }

    private executeIntro(): void {
        
    }

    private executeMain(): void {

    }

    private executeEnding(): void {
        
    }

    playScene(): void {
        this.executeCommon();

        if (this.state == SceneState.intro) { this.executeIntro(); }
        if (this.state == SceneState.playing) { this.executeMain(); }
        if (this.state == SceneState.ending) { this.executeEnding(); }
    }


    close(): void {
        this.backgroundSound.stop();
    }
}