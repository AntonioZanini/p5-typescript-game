const showColisionBox = false;
var ResourceType;
(function (ResourceType) {
    ResourceType["image"] = "IMAGEM";
    ResourceType["spriteSheet"] = "SPRITESHEET";
    ResourceType["sound"] = "SOM";
    ResourceType["font"] = "FONTE";
    ResourceType["text"] = "TEXTO";
})(ResourceType || (ResourceType = {}));
var ColisionType;
(function (ColisionType) {
    ColisionType[ColisionType["rect"] = 0] = "rect";
    ColisionType[ColisionType["circle"] = 1] = "circle";
})(ColisionType || (ColisionType = {}));
var SizeType;
(function (SizeType) {
    SizeType[SizeType["fixed"] = 0] = "fixed";
    SizeType[SizeType["dynamic"] = 1] = "dynamic";
})(SizeType || (SizeType = {}));
class Resources {
    constructor() {
        this.listaStringsRecursos = {};
        this.listaRecursos = {};
        this.listaCores = {};
        this.listaCores.vermelho = color(255, 0, 0);
        this.listaCores.verde = color(0, 127, 0);
        this.listaCores.azul = color(0, 0, 127);
        this.listaCores.amarelo = color(127, 127, 0);
        this.listaCores.laranja = color(255, 127, 0);
        this.listaCores.rosa = color(255, 0, 127);
        this.listaCores.transparente = color(0, 0, 0, 0);
    }
    importFromJSON(path, loadResources) {
        const importedData = loadJSON(path, (result) => {
            this.addFromJSON(result, loadResources);
        });
    }
    addFromJSON(importedData, loadResources) {
        if (importedData) {
            importedData.commonResources.forEach(commonResource => {
                this.addRecurso(commonResource.type, [[commonResource.name, commonResource.path]]);
            });
            this.addSprite(importedData.spriteResources);
            if (loadResources) {
                this.load();
            }
        }
    }
    addRecurso(tipoRecurso, listaRecursos) {
        if (this.listaStringsRecursos[tipoRecurso]) {
            this.listaStringsRecursos[tipoRecurso] = this.listaStringsRecursos[tipoRecurso].concat(listaRecursos);
        }
        else {
            this.listaStringsRecursos[tipoRecurso] = [].concat(listaRecursos);
        }
    }
    addSprite(listaStringsSprites) {
        if (this.listaStringsSprites) {
            this.listaStringsSprites = this.listaStringsSprites.concat(listaStringsSprites);
        }
        else {
            this.listaStringsSprites = [].concat(listaStringsSprites);
        }
    }
    load() {
        for (let propertyName in this.listaStringsRecursos) {
            this.listaStringsRecursos[propertyName].
                forEach((tuple) => {
                let res = this.loadResource(propertyName, tuple[1]);
                if (this.listaRecursos[propertyName]) {
                    this.listaRecursos[propertyName].push([tuple[0], res]);
                }
                else {
                    this.listaRecursos[propertyName] = [].concat([[tuple[0], res]]);
                }
            });
        }
        this.listaStringsSprites.forEach(stringSprite => {
            const name = stringSprite.name;
            let image = loadImage(stringSprite.path);
            const sprite = new Sprite(image, stringSprite.spriteWidth, stringSprite.spriteHeight, stringSprite.spriteNumber, stringSprite.spritePerRow, stringSprite.tipoColisao, stringSprite.caixaColisao, stringSprite.recolors);
            if (this.listaRecursos[ResourceType.spriteSheet]) {
                this.listaRecursos[ResourceType.spriteSheet].push([name, sprite]);
            }
            else {
                this.listaRecursos[ResourceType.spriteSheet] = [].concat([[name, sprite]]);
            }
        });
    }
    loadRecolors() {
        this.listaRecursos[ResourceType.spriteSheet].forEach(rsrc => {
            const recolorSprites = rsrc[1].generateRecolorList(rsrc[0]);
            if (recolorSprites) {
                recolorSprites.forEach(recoloredSprite => {
                    this.listaRecursos[ResourceType.spriteSheet].push([recoloredSprite[0], rsrc[1].changeSprite(recoloredSprite[1])]);
                });
            }
        });
    }
    getRecurso(tipoRecurso, nomeRecurso) {
        return this.listaRecursos[tipoRecurso].find(r => r[0] === nomeRecurso)[1];
    }
    loadResource(tipoRecurso, caminho) {
        switch (tipoRecurso) {
            case ResourceType.font:
                return loadFont(caminho);
            case ResourceType.image:
                return loadImage(caminho);
            case ResourceType.sound:
                return new p5.SoundFile(caminho).loadSound(caminho);
            case ResourceType.text:
                return caminho;
        }
    }
}
let resources;
let img;
let personagem;
let personagem2;
let personagem3;
let blinkSlime;
let animacao;
let animacao2;
let animacaoAtual;
let animaDogLeft;
let animaDogRight;
let witchLeft;
let witchRight;
let charAnimations;
let dir = -1;
function preload() {
    resources = new Resources();
    resources.importFromJSON('assets/json/resources.json', true);
}
function setup() {
    resources.loadRecolors();
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    img = resources.getRecurso(ResourceType.image, 'BG_FOREST');
    personagem = new Actor({
        posX: 300,
        posY: windowHeight - 100,
        width: 55,
        height: 55
    }, SizeType.fixed);
    personagem2 = new Actor({
        posX: 600,
        posY: windowHeight - 100,
        width: 55,
        height: 55
    }, SizeType.fixed);
    personagem3 = new Actor({
        posX: 100,
        posY: windowHeight / 2,
        width: 0,
        height: 0
    }, SizeType.dynamic);
    blinkSlime = new MultipleSpriteAnimation([resources.getRecurso(ResourceType.spriteSheet, "slime_orange"),
        resources.getRecurso(ResourceType.spriteSheet, "slime_red"),], [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 7],
        [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14]], true, 4, true);
    witchLeft = new SingleSpriteAnimation(resources.getRecurso(ResourceType.spriteSheet, "witchCharge"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], true, 1, false, 240, 240);
    witchRight = new SingleSpriteAnimation(resources.getRecurso(ResourceType.spriteSheet, "witchCharge"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], true, 1, true, 120, 120);
    animaDogLeft = new SingleSpriteAnimation(resources.getRecurso(ResourceType.spriteSheet, "dog_green"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24], true, 0, false, 82, 60);
    animaDogRight = new SingleSpriteAnimation(resources.getRecurso(ResourceType.spriteSheet, "dog_red"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24], true, 0, true, 164, 120);
    animacao = new SingleSpriteAnimation(resources.getRecurso(ResourceType.spriteSheet, "slime_red"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], true, 0, true);
    animacao2 = new SingleSpriteAnimation(resources.getRecurso(ResourceType.spriteSheet, "slime"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], true, 0, false);
    animacaoAtual = animaDogLeft;
    charAnimations = [animaDogRight, animaDogLeft];
    dir = -1;
    textSize(30);
}
function draw() {
    let selectedChar = personagem3;
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
function windowResized() {
    createCanvas(windowWidth, windowHeight);
}
class MultipleSpriteAnimation {
    constructor(sprites, frameNumberList, loop, frameDelay = 0, hFlipped = false, suggestedWidth, suggestedHeight) {
        this.sprites = sprites;
        this.frameNumberList = frameNumberList;
        this.loop = loop;
        this.frameDelay = frameDelay;
        this.hFlipped = hFlipped;
        this.suggestedWidth = suggestedWidth;
        this.suggestedHeight = suggestedHeight;
        this.currentFrame = 0;
        this.delay = 0;
        this.delay = this.frameDelay;
    }
    draw(location) {
        const sprite = this.sprites[this.frameNumberList[this.currentFrame][0]];
        sprite.drawFrame(this.frameNumberList[this.currentFrame][1], location, this.hFlipped);
        if (this.currentFrame === this.frameNumberList.length - 1 &&
            this.loop == false) {
            return;
        }
        if (this.delay <= 0) {
            this.currentFrame++;
            this.delay = this.frameDelay;
            if (this.currentFrame >= this.frameNumberList.length) {
                this.currentFrame = (this.loop) ? 0 : this.currentFrame - 1;
            }
        }
        else {
            this.delay--;
        }
    }
    animate() {
        return new MultipleSpriteAnimation(this.sprites, this.frameNumberList, this.loop, this.frameDelay, this.hFlipped, this.suggestedWidth, this.suggestedHeight);
    }
    equals(animation) {
        if (!(animation instanceof MultipleSpriteAnimation)) {
            return false;
        }
        if (this.sprites === animation.sprites &&
            this.frameNumberList === animation.frameNumberList &&
            this.loop === animation.loop &&
            this.frameDelay === animation.frameDelay &&
            this.hFlipped === animation.hFlipped &&
            this.suggestedWidth == animation.suggestedWidth &&
            this.suggestedHeight == animation.suggestedHeight) {
            return true;
        }
        return false;
    }
}
class SingleSpriteAnimation {
    constructor(sprite, frameNumberList, loop, frameDelay = 0, hFlipped = false, suggestedWidth, suggestedHeight) {
        this.sprite = sprite;
        this.frameNumberList = frameNumberList;
        this.loop = loop;
        this.frameDelay = frameDelay;
        this.hFlipped = hFlipped;
        this.suggestedWidth = suggestedWidth;
        this.suggestedHeight = suggestedHeight;
        this.currentFrame = 0;
        this.delay = 0;
        this.delay = this.frameDelay;
    }
    draw(location) {
        this.sprite.drawFrame(this.frameNumberList[this.currentFrame], location, this.hFlipped);
        if (this.currentFrame === this.frameNumberList.length - 1 &&
            this.loop == false) {
            return;
        }
        if (this.delay <= 0) {
            this.currentFrame++;
            this.delay = this.frameDelay;
            if (this.currentFrame >= this.frameNumberList.length) {
                this.currentFrame = (this.loop) ? 0 : this.currentFrame - 1;
            }
        }
        else {
            this.delay--;
        }
    }
    animate() {
        return new SingleSpriteAnimation(this.sprite, this.frameNumberList, this.loop, this.frameDelay, this.hFlipped, this.suggestedWidth, this.suggestedHeight);
    }
    equals(animation) {
        if (!(animation instanceof SingleSpriteAnimation)) {
            return false;
        }
        if (this.sprite === animation.sprite &&
            this.frameNumberList === animation.frameNumberList &&
            this.loop === animation.loop &&
            this.frameDelay === animation.frameDelay &&
            this.hFlipped === animation.hFlipped &&
            this.suggestedWidth == animation.suggestedWidth &&
            this.suggestedHeight == animation.suggestedHeight) {
            return true;
        }
        return false;
    }
}
class Sprite {
    constructor(spriteSheet, spriteWidth, spriteHeight, spriteNumber, spritesByRow, colisionType, colisionBox, recolors) {
        this.spriteSheet = spriteSheet;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spriteNumber = spriteNumber;
        this.spritesByRow = spritesByRow;
        this.colisionType = colisionType;
        this.colisionBox = colisionBox;
        this.recolors = recolors;
        this.frameArray = [];
        for (let i = 0; i < this.spriteNumber; i++) {
            const coordX = (i % this.spritesByRow) * this.spriteWidth;
            const coordY = Math.floor(i / this.spritesByRow) * this.spriteHeight;
            this.frameArray.push([coordX, coordY]);
        }
    }
    generateRecolorList(name) {
        if (this.recolors) {
            const recolorList = [];
            this.recolors.forEach(recolor => {
                const pg = createGraphics(this.spriteSheet.width, this.spriteSheet.height);
                pg.imageMode(CORNER);
                pg.tint(resources.listaCores[recolor.colorName]);
                pg.image(this.spriteSheet, 0, 0);
                const tintedImage = pg.get();
                pg.noTint();
                recolorList.push([`${name}_${recolor.sufix}`, tintedImage]);
            });
            return recolorList;
        }
    }
    drawFrame(frameNumber, location, hFlipped) {
        let hDirection = hFlipped ? -1 : 1;
        push();
        scale(hDirection, 1);
        image(this.spriteSheet, location.posX * hDirection, location.posY, location.width, location.height, this.frameArray[frameNumber][0], this.frameArray[frameNumber][1], this.spriteWidth, this.spriteHeight);
        if (showColisionBox) {
            if (this.colisionType = ColisionType.circle) {
                noFill();
                circle((location.posX * hDirection) + (this.colisionBox[0] * location.width), location.posY + (this.colisionBox[1] * location.height), this.colisionBox[2] * location.width);
            }
        }
        scale(1, 1);
        pop();
    }
    changeSprite(sprite) {
        return new Sprite(sprite, this.spriteWidth, this.spriteHeight, this.spriteNumber, this.spritesByRow, this.colisionType, this.colisionBox);
    }
}
class Barra {
    constructor(imagem, valorMaximo, corPrincipal, corSecundaria, posX, posY, largura, altura) {
        this.imagem = imagem;
        this.valorMaximo = valorMaximo;
        this.corPrincipal = corPrincipal;
        this.corSecundaria = corSecundaria;
        this.posX = posX;
        this.posY = posY;
        this.largura = largura;
        this.altura = altura;
    }
    draw(valor) {
        const ajuste = this.altura * 0.2;
        fill(this.corSecundaria);
        rect(this.posX, this.posY, this.largura, this.altura, 30);
        let largura = this.largura * (valor / this.valorMaximo);
        fill(this.corPrincipal);
        rect(this.posX, this.posY, largura, this.altura, 30);
        fill(color(0, 0, 0));
        image(this.imagem, this.posX - ajuste, this.posY - ajuste, this.altura + ajuste, this.altura + ajuste);
    }
}
class Botao {
    constructor(texto, posX, posY, classe, centralizacao) {
        this.texto = texto;
        this.posX = posX;
        this.posY = posY;
        this.classe = classe;
        this.centralizacao = centralizacao;
        this.visible = false;
    }
    load(funcao) {
        this.botao = createButton(this.texto);
        this.botao.mousePressed(funcao);
        this.botao.addClass(this.classe);
        this.visible = true;
    }
    draw() {
        this.botao.position(this.posX, this.posY);
        if (this.visible == true && this.centralizacao) {
            this.botao.center(this.centralizacao);
        }
    }
    close() {
        this.visible = false;
        this.botao.remove();
    }
}
class Actor {
    constructor(location, sizeType) {
        this.location = location;
        this.sizeType = sizeType;
    }
    draw(animation) {
        if (!this.currentAnimation || !this.currentAnimation.equals(animation)) {
            this.currentAnimation = animation;
            if (this.sizeType == SizeType.dynamic) {
                this.updateSize();
            }
        }
        this.currentAnimation.draw(this.location);
    }
    updateSize() {
        console.log([this.location.height, this.location.width]);
        const a = this.currentAnimation;
        if (a.suggestedHeight && this.location.height > 0) {
            this.location.posY = this.location.posY +
                (this.location.height - a.suggestedHeight);
        }
        this.location.height = a.suggestedHeight ?
            a.suggestedHeight :
            this.location.height;
        this.location.width = a.suggestedWidth ?
            a.suggestedWidth :
            this.location.width;
        console.log(a);
    }
}
class Player extends Actor {
    constructor(location, sizeType, states) {
        super(location, sizeType);
        this.states = states;
    }
}
//# sourceMappingURL=build.js.map