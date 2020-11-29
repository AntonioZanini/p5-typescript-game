import { AvailableScenes } from './enums';
import SceneController from './framework/controller/scene-controller';
import GameController from './framework/controller/game-controller';
import KeyEventController from './framework/controller/key-event-controller';
import ResourceController from './framework/controller/resource-controller'

const resourceController = new ResourceController();
const keyEventController = new KeyEventController();
const gameController = new GameController();
const sceneController = new SceneController<AvailableScenes>(gameController, resourceController, keyEventController);

function preload() {
    resourceController.importFromJSON('');
}
  
function setup() {
    resourceController.load();
    //sceneController.addScenes();
}
  
function draw() {
    sceneController.playScene();
    keyEventController.sendKeyEvents(keyCode);
}

function windowResized() {
    createCanvas(windowWidth, windowHeight);
}
