class Resources {

  private listaStringsRecursos: Record<ResourceName, Array<[string, string]>>;
  private listaRecursos: Record<ResourceName, Array<[string, any]>>;

  private listaStringsSprites: Array<ISpriteImportResource>;

  public listaCores: Record<ColorName, p5.Color>;

  constructor() {
    this.listaStringsRecursos = {} as Record<ResourceName, Array<[string, string]>>;
    this.listaRecursos = {} as Record<ResourceName, Array<[string, any]>>;

    this.listaCores = {} as Record<ColorName, p5.Color>;
    this.listaCores.vermelho = color(255, 0, 0);
    this.listaCores.verde = color(0, 127, 0);
    this.listaCores.azul = color(0, 0, 127);
    this.listaCores.amarelo = color(127, 127, 0);
    this.listaCores.laranja = color(255, 127, 0);
    this.listaCores.rosa = color(255, 0, 127);
    this.listaCores.transparente = color(0, 0, 0, 0);

  }

  importFromJSON(path: string, loadResources: boolean) {
    const importedData = loadJSON(path,
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
        this.load();
      }
    }
  }

  addRecurso(tipoRecurso: ResourceType, listaRecursos: Array<[string, string]>) {
    if (this.listaStringsRecursos[tipoRecurso]) {
      this.listaStringsRecursos[tipoRecurso] = this.listaStringsRecursos[tipoRecurso].concat(listaRecursos);
    } else {
      this.listaStringsRecursos[tipoRecurso] = [].concat(listaRecursos);
    }
  }

  addSprite(listaStringsSprites: Array<ISpriteImportResource>){
    if (this.listaStringsSprites) {
      this.listaStringsSprites = this.listaStringsSprites.concat(listaStringsSprites);
    } else {
      this.listaStringsSprites = [].concat(listaStringsSprites);
    }
  }

  load() {

    for (let propertyName in this.listaStringsRecursos) {
      this.listaStringsRecursos[propertyName as ResourceName].
        forEach((tuple) => {
          let res: any = this.loadResource(propertyName as ResourceType, tuple[1]);
          if (this.listaRecursos[propertyName as ResourceName]) {
            this.listaRecursos[propertyName as ResourceName].push([tuple[0], res]);
          } else {
            this.listaRecursos[propertyName as ResourceName] = [].concat([[tuple[0], res]]);
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
        this.listaRecursos[ResourceType.spriteSheet as ResourceName] = [].concat([[name, sprite]]);
      }
    });
  }

  loadRecolors(){
    this.listaRecursos[ResourceType.spriteSheet as ResourceName].forEach(rsrc => {

      const recolorSprites = (rsrc[1] as Sprite).generateRecolorList(rsrc[0]);
      if (recolorSprites) {
        recolorSprites.forEach(recoloredSprite => {
          this.listaRecursos[ResourceType.spriteSheet as ResourceName].push([recoloredSprite[0], (rsrc[1] as Sprite).changeSprite(recoloredSprite[1])]);
        });
      }
    });
  }

  getRecurso<T>(tipoRecurso: ResourceType, nomeRecurso: string):T{
    return this.listaRecursos[tipoRecurso as ResourceName].find(r => r[0] === nomeRecurso)[1] as T;
  }

  private loadResource(tipoRecurso: ResourceType, caminho: string) : any {
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