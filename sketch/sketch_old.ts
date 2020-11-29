import { ResourceType, SizeType, DirectionType } from './enums_old';
import { ISpriteAnimation } from './interfaces';
import { Resources } from './resources';
import { Sprite } from './animation/sprite';
import { SingleSpriteAnimation } from './animation/single-sprite-animation';
import { MultipleSpriteAnimation } from './animation/multiple-sprite-animation';
import { Actor } from './game/actor';
import { MobileActor } from './game/mobile-actor';
import { ControlledActor } from './game/controlled-actor';

// GLOBAL VARS & TYPES


let img: p5.Image | undefined;

let personagem: Actor;
let personagem2: Actor;
let personagem3: Actor;
let dogChar: ControlledActor;

let dir: number = -1;

function preload() {
  const resources = Resources.getInstace();
  resources.importFromJSON('assets/json/resources.json', true);
  
}

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  const resources = Resources.getInstace();
  resources.load();
  // FULLSCREEN CANVAS
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  // SETUP SOME OPTIONS
  //rectMode(CENTER).noFill().frameRate(30);


  img = resources.getRecurso<p5.Image>(ResourceType.image, 'BG_FOREST');

  personagem = new Actor({
    posX: 300,
    posY: windowHeight - 100,
    width: 75,
    height: 75
  },
  SizeType.fixed
  );
  personagem2 = new Actor({
    posX: 600,
    posY: windowHeight - 100,
    width: 75,
    height: 75
  },
  SizeType.fixed);

  personagem3 = new Actor({
    posX: 100,
    posY: windowHeight / 2,
    width: 0,//240,//168,//164,
    height: 0//240//129//120
  },
  SizeType.dynamic
  );

  dir = -1;
  textSize(30);

  
  dogChar = new ControlledActor({
      posX: windowWidth / 2,
      posY: windowHeight -100,
      width: 0,
      height: 0,
    },
    SizeType.dynamic,
    {
      left: resources.animacoes.dogLeft.animate(),
      right: resources.animacoes.dogRight.animate()
    },
    DirectionType.right,
    {
      right: [RIGHT_ARROW, 68],
      left: [LEFT_ARROW, 65]
    }
  );

}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  const resources = Resources.getInstace();
  clear();

  if (img) {
    image(img, 0, 0, width, height);
  }
  text(frameCount, 0, 0, 200, 200);

  
  dogChar.draw();
  dogChar.keyIsPressed();

  personagem.draw(resources.animacoes.blinkSlime.animate());
  personagem3.draw(resources.animacoes.slime.animate());
  personagem2.draw(resources.animacoes.slime.animate());
}

function keyPressed() {
  if (keyCode === UP_ARROW) {

  }
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  createCanvas(windowWidth, windowHeight);
}
