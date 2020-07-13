// GLOBAL VARS & TYPES

let resources: Resources;
let img: p5.Image;

let personagem: Actor;
let personagem2: Actor;
let personagem3: Actor;

let blinkSlime: ISpriteAnimation;

let animacao: SingleSpriteAnimation;
let animacao2: SingleSpriteAnimation;
let animacaoAtual: SingleSpriteAnimation;
let animaDogLeft: SingleSpriteAnimation;
let animaDogRight: SingleSpriteAnimation;

let witchLeft: SingleSpriteAnimation;
let witchRight: SingleSpriteAnimation;

let charAnimations: [SingleSpriteAnimation, SingleSpriteAnimation];

let dir: number = -1;

function preload() {
  resources = new Resources();
  resources.importFromJSON('assets/json/resources.json', true);
  
}

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  resources.loadRecolors();
  // FULLSCREEN CANVAS
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  // SETUP SOME OPTIONS
  //rectMode(CENTER).noFill().frameRate(30);


  img = resources.getRecurso<p5.Image>(ResourceType.image, 'BG_FOREST');

  personagem = new Actor({
    posX: 300,
    posY: windowHeight - 100,
    width: 55,
    height: 55
  },
  SizeType.fixed
  );
  personagem2 = new Actor({
    posX: 600,
    posY: windowHeight - 100,
    width: 55,
    height: 55
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


  blinkSlime = new MultipleSpriteAnimation(
    [resources.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_orange"),
    resources.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_red"),],
    [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [1,7], 
     [1,8], [1,9], [1,10], [1,11], [1,12], [1,13], [1,14]], 
    true,
    4,
    true);

  witchLeft = new SingleSpriteAnimation(
    resources.getRecurso<Sprite>(ResourceType.spriteSheet, "witchCharge"),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
     true,
     1,
     false,
     240,
     240
  );
  witchRight = new SingleSpriteAnimation(
    resources.getRecurso<Sprite>(ResourceType.spriteSheet, "witchCharge"),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
     true,
     1,
     true,
     120,
     120
  );

  animaDogLeft = new SingleSpriteAnimation(
    resources.getRecurso<Sprite>(ResourceType.spriteSheet, "dog_green"),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
     true,
     0,
     false,
     82, 60
  );

  animaDogRight = new SingleSpriteAnimation(
    resources.getRecurso<Sprite>(ResourceType.spriteSheet, "dog_red"),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
     15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
     true,
     0,
     true,
     164, 120
  );

  animacao = new SingleSpriteAnimation(
    resources.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_red"),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    true,
    0,
    true);

  animacao2 = new SingleSpriteAnimation(
    resources.getRecurso<Sprite>(ResourceType.spriteSheet, "slime"),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    true,
    0,
    false);
  animacaoAtual = animaDogLeft;
  charAnimations = [ animaDogRight, animaDogLeft ]
  dir = -1;
  textSize(30);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  let selectedChar: Actor = personagem3;//personagem2;
  //[animacao, animacao2];
  clear();
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    if (dir == -1) {
      selectedChar.location.posX += selectedChar.location.width;
      animacaoAtual = charAnimations[0];
      dir = 1;
    }
    selectedChar.location.posX += 5;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    if (dir == 1) {
      selectedChar.location.posX -= selectedChar.location.width;
      animacaoAtual = charAnimations[1];
      dir = -1;
    }
    selectedChar.location.posX -= 5;
  }

  image(img, 0, 0, width, height);
  //text(frameCount, 0, 0, 200, 200);

  personagem.draw(blinkSlime.animate());
  personagem3.draw(animacaoAtual.animate());
  personagem2.draw(animacao.animate());
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    personagem3.location.width = 55;
    personagem3.location.height = 55;
    charAnimations = [animacao, animacao2];
    personagem3.draw(charAnimations[0].animate());
  }
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  createCanvas(windowWidth, windowHeight);
}
