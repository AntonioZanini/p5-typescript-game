import { AvailableScenes, SceneState } from "../../enums";
import BackgroundImage from "../../framework/animation/background-image";
import { getSumModifier } from "../../framework/animation/tools";
import { IKeyEventListener, IScene } from "../../framework/controller/interfaces";
import { ResourceType } from "../../framework/enums";
import SceneBase from "./scene-base"

export default class MainTitle extends SceneBase<AvailableScenes> 
    implements IScene<AvailableScenes>, IKeyEventListener {
    private nextScene : AvailableScenes;
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
                this.currentDirection = -1;
                break;
            case RIGHT_ARROW:
                this.currentDirection = 1;
                break;
        }
    }

    initialize(): void {
        this.backgroundImage = new BackgroundImage("bgi-main-title");
        this.backgroundSound = this.controller.resourceController.getResource<p5.SoundFile>(ResourceType.sound, "bgm-main-title");
        this.backgroundSound.loop();
    }

    private executeCommon(): void {
        this.backgroundImage.update(getSumModifier(this.currentDirection * this.speed));
        this.currentDirection = 0;
        this.backgroundImage.draw();
    }

    private executeIntro(): void {
        let endIntro : boolean = false;

        if (endIntro) { this.state = SceneState.playing }
    }

    private executeMain(): void {
        let endMain : boolean = false;

        if (endMain) { this.state = SceneState.ending }
    }

    private executeEnding(): void {
        let endEnding : boolean = false;

        if (endEnding) { this.controller.changeScene(this.nextScene); }
    }

    playScene(): void {
        this.executeCommon();

        if (this.state == SceneState.intro) { this.executeIntro(); }
        else if (this.state == SceneState.playing) { this.executeMain(); }
        else if (this.state == SceneState.ending) { this.executeEnding(); }
    }


    close(): void {
        this.backgroundSound.stop();
    }
}