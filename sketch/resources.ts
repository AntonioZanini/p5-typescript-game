import p5 from 'p5';
import { ColorName, ResourceName, ResourceType, AnimationList } from './enums';
import { ISpriteImportResource, IResourcePackJSON, ISpriteAnimation } from './interfaces';
import { Sprite } from './animation/sprite';
import { SingleSpriteAnimation } from './animation/single-sprite-animation'
import { MultipleSpriteAnimation } from './animation/multiple-sprite-animation'

export class Resources {

  private listaStringsRecursos: Record<ResourceName, Array<[string, string]>>;
  private listaRecursos: Record<ResourceName, Array<[string, any]>>;
  private listaStringsSprites: Array<ISpriteImportResource>;

  public animacoes: Record<AnimationList, ISpriteAnimation>;

  public listaCores: Record<ColorName, p5.Color>;
  private static instance: Resources;

  private constructor() {
    this.listaStringsRecursos = {} as Record<ResourceName, Array<[string, string]>>;
    this.listaRecursos = {} as Record<ResourceName, Array<[string, any]>>;
    this.animacoes = {} as Record<AnimationList, ISpriteAnimation>;

    this.listaCores = {} as Record<ColorName, p5.Color>;
    this.listaCores.vermelho = color(255, 0, 0);
    this.listaCores.verde = color(0, 127, 0);
    this.listaCores.azul = color(0, 0, 127);
    this.listaCores.amarelo = color(127, 127, 0);
    this.listaCores.laranja = color(255, 127, 0);
    this.listaCores.rosa = color(255, 0, 127);
    this.listaCores.transparente = color(0, 0, 0, 0);

  }

  public static getInstace(): Resources {
    if (!Resources.instance) {
      Resources.instance = new Resources();
    }
    return Resources.instance;
  }

  importFromJSON(path: string, loadResources: boolean) {
    loadJSON(path,
      (result: IResourcePackJSON) => {
        this.addFromJSON(result, loadResources);
      }) as IResourcePackJSON;

  }

  private addFromJSON(importedData: IResourcePackJSON | undefined, loadResources: boolean) {
    if (importedData) {
      importedData.commonResources.forEach(commonResource => {
        this.addRecurso(commonResource.type as ResourceType, [[commonResource.name, commonResource.path]]);
      });
      this.addSprite(importedData.spriteResources)
      if (loadResources) {
        this.preload();
      }
    }
  }

  addRecurso(tipoRecurso: ResourceType, listaRecursos: Array<[string, string]>) {
    if (this.listaStringsRecursos[tipoRecurso]) {
      this.listaStringsRecursos[tipoRecurso] = this.listaStringsRecursos[tipoRecurso].concat(listaRecursos);
    } else {
      this.listaStringsRecursos[tipoRecurso] = ([] as Array<[string, string]>).concat(listaRecursos);
    }
  }

  addSprite(listaStringsSprites: Array<ISpriteImportResource>) {
    if (this.listaStringsSprites) {
      this.listaStringsSprites = this.listaStringsSprites.concat(listaStringsSprites);
    } else {
      this.listaStringsSprites = ([] as Array<ISpriteImportResource>).concat(listaStringsSprites);
    }
  }

  preload() {

    for (let propertyName in this.listaStringsRecursos) {
      this.listaStringsRecursos[propertyName as ResourceName].
        forEach((tuple) => {
          let res: any = this.loadResource(propertyName as ResourceType, tuple[1]);
          if (this.listaRecursos[propertyName as ResourceName]) {
            this.listaRecursos[propertyName as ResourceName].push([tuple[0], res]);
          } else {
            this.listaRecursos[propertyName as ResourceName] = ([] as Array<[string, any]>).concat([[tuple[0], res]]);
          }
        });
    }

    this.listaStringsSprites.forEach(stringSprite => {
      const name: string = stringSprite.name;
      let image: p5.Image = loadImage(stringSprite.path);
      const sprite: Sprite = new Sprite(
        image,
        stringSprite.spriteWidth,
        stringSprite.spriteHeight,
        stringSprite.spriteNumber,
        stringSprite.spritePerRow,
        stringSprite.tipoColisao,
        stringSprite.caixaColisao,
        stringSprite.recolors
      );
      if (this.listaRecursos[ResourceType.spriteSheet as ResourceName]) {
        this.listaRecursos[ResourceType.spriteSheet as ResourceName].push([name, sprite]);
      } else {
        this.listaRecursos[ResourceType.spriteSheet as ResourceName] = ([] as Array<[string, any]>).concat([[name, sprite]]);
      }
    });
  }

  load() {
    this.listaRecursos[ResourceType.spriteSheet as ResourceName].forEach(rsrc => {

      const recolorSprites = (rsrc[1] as Sprite).generateRecolorList(rsrc[0]);
      if (recolorSprites) {
        recolorSprites.forEach(recoloredSprite => {
          this.listaRecursos[ResourceType.spriteSheet as ResourceName].push([recoloredSprite[0], (rsrc[1] as Sprite).changeSprite(recoloredSprite[1])]);
        });
      }
    });
    this.createAnimations();
  }

  getRecurso<T>(tipoRecurso: ResourceType, nomeRecurso: string): T | undefined {
    let selectedRes = this.listaRecursos[tipoRecurso as ResourceName].find(r => r[0] === nomeRecurso)
    return (selectedRes) ? selectedRes[1] as T : undefined;
  }

  private loadResource(tipoRecurso: ResourceType, caminho: string): any {
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


  private createAnimations() {
    let spriteSheetList = [] as Array<Sprite|undefined>;
    spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_green"))
    spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_blue"))
    

    this.animacoes.blinkSlime =  new MultipleSpriteAnimation(
      AnimationList.blinkSlime,
      spriteSheetList.filter(s => s) as Array<Sprite>,
      [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [1,7], 
       [1,8], [1,9], [1,10], [1,11], [1,12], [1,13], [1,14]], 
      true,
      4,
      true);
  

    spriteSheetList = [] as Array<Sprite|undefined>;
    spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "dog_green"));

    this.animacoes.dogLeft = new SingleSpriteAnimation(
      AnimationList.dogLeft,
      spriteSheetList.find(s => s) as Sprite,
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
       true,
       0,
       false,
       82, 60
    );
  
    spriteSheetList = [] as Array<Sprite|undefined>;
    spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "dog_red"));

    this.animacoes.dogRight = new SingleSpriteAnimation(
      AnimationList.dogRight,
      spriteSheetList.find(s => s) as Sprite,
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
       15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
       true,
       0,
       true,
       164, 120
    );
  
    spriteSheetList = [] as Array<Sprite|undefined>;
    spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_red"));

    this.animacoes.dogRight =  new SingleSpriteAnimation(
      AnimationList.slime,
      spriteSheetList.find(s => s) as Sprite,
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      true,
      0,
      true);
  
  }
}