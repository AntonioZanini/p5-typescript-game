import { ColisionType } from '../enums';
import { IRectangle, IRecolor } from '../interfaces';

export class Sprite {

  private frameArray: Array<[number, number]>;
  private spriteSheet: p5.Image;
  private spriteWidth: number;
  private spriteHeight: number;
  private spriteNumber: number;
  private spritesByRow: number;
  private colisionType: ColisionType;
  private colisionBox: Array<number>;
  private recolors?: Array<IRecolor>;

  constructor(
    spriteSheet: p5.Image,
    spriteWidth: number,
    spriteHeight: number,
    spriteNumber: number,
    spritesByRow: number,
    colisionType: ColisionType,
    colisionBox: Array<number>,
    recolors?: Array<IRecolor>) {

    this.frameArray = [];
    for (let i = 0; i < this.spriteNumber; i++) {
      const coordX: number = (i % this.spritesByRow) * this.spriteWidth;
      const coordY: number = Math.floor(i / this.spritesByRow) * this.spriteHeight;
      this.frameArray.push([coordX, coordY]);
    }
  }

  generateRecolorList(name: string): Array<[string, any]> | undefined {
    if (this.recolors) {
      const recolorList: Array<[string, any]> = [];
      this.recolors.forEach(recolor => {
        const pg = createGraphics(this.spriteSheet.width, this.spriteSheet.height);

        pg.imageMode(CORNER);
        pg.tint(resources.listaCores[recolor.colorName]);
        pg.image(this.spriteSheet, 0, 0);
        const tintedImage = pg.get();
        pg.noTint();
        recolorList.push([`${name}_${recolor.sufix}`, tintedImage])
      });
      return recolorList;
    }
    return undefined;
  }

  drawFrame(frameNumber: number,
    location: IRectangle,
    hFlipped: boolean): void {

    let hDirection = hFlipped ? -1 : 1;
    push();
    scale(hDirection, 1);
    image(
      this.spriteSheet,
      location.posX * hDirection,
      location.posY,
      location.width,
      location.height,
      this.frameArray[frameNumber][0],
      this.frameArray[frameNumber][1],
      this.spriteWidth,
      this.spriteHeight,
    );
    if (showColisionBox) {
      if (this.colisionType = ColisionType.circle) {
        noFill();
        circle(
          (location.posX * hDirection) + (this.colisionBox[0] * location.width),
          location.posY + (this.colisionBox[1] * location.height),
          this.colisionBox[2] * location.width
        );
      }
    }
    scale(1, 1);
    pop();
  }

  changeSprite(sprite: p5.Image): Sprite {
    return new Sprite(
      sprite,
      this.spriteWidth,
      this.spriteHeight,
      this.spriteNumber,
      this.spritesByRow,
      this.colisionType,
      this.colisionBox
    )
  }

}