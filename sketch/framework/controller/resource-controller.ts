import { IResourceController, IImportResource, ISpriteImportResource, IResourcePackJSON, IImportResourceFile, IImportResourceText, IResource, IAnimationResourceLoader } from './interfaces';
import { ResourceType, ResourceContentType, AvailableColor } from '../enums';
import { SpriteSheet } from '../animation/sprite-sheet';
import { ISpriteSheet } from '../animation/interfaces';
import { SoundFile } from 'p5';

export default class ResourceController implements IResourceController {
    private resourceAddressList : Record<ResourceType, Array<IImportResource>>;
    private resources : Record<ResourceType, Array<IResource>>;
    private colors : Record<AvailableColor, p5.Color>;

    constructor() {

        this.colors = {} as Record<AvailableColor, p5.Color>;
        this.colors.red = color(255, 0, 0);
        this.colors.green = color(0, 127, 0);
        this.colors.blue = color(0, 0, 127);
        this.colors.yellow = color(127, 127, 0);
        this.colors.orange = color(255, 127, 0);
        this.colors.pink = color(255, 0, 127);
        this.colors.transparent = color(0, 0, 0, 0);
    }

    getColor(colorName : AvailableColor) : p5.Color {
        return this.colors[colorName];
    }

    importFromJSON(path: string): void {
        loadJSON(
            path,
            (result: IResourcePackJSON) => this.addResourcesFromJSON(result)
        );
    }
    addResources(...resources: IImportResource[]): void {
        if (!resources) { return; }
        const groupedResources = this.groupImportResourcesByType(resources);
        for (let resourceType in Object.keys(groupedResources)) {
            const key = resourceType as ResourceType
            if (!this.resourceAddressList[key]) {
                this.resourceAddressList[key] = ([] as Array<IImportResource>);
            }
            this.resourceAddressList[key] = this.resourceAddressList[key].concat(groupedResources[key]);
        }
    }

    load(animationResourceLoader?: IAnimationResourceLoader): void {
        this.recolorirSpriteSheets();
        if (animationResourceLoader) {
            animationResourceLoader.load(this);
        }
    }

    getResource<T extends ResourceContentType>(resourceType: ResourceType, resourceID: string): T {
        let resource = this.resources[resourceType].find(r => r.id === resourceID)
        return resource?.content as T ;
    }

    private addResourcesFromJSON(importedData: IResourcePackJSON | undefined) {
        if (importedData) {
            this.addResources(...importedData.resources);
            this.preload();
        }
    }

    preload() {

        for (let propertyName in Object.keys(this.resourceAddressList)) {
            const typeKey = propertyName as ResourceType;
            this.resourceAddressList[typeKey].
                forEach((importResource: IImportResource) => {
                    const typeKey = propertyName as ResourceType;
                    const loadedResource = this.loadResource(typeKey, importResource);

                    if (!this.resources[typeKey]) {
                        this.resources[typeKey] = ([] as Array<IResource>)
                    }
                    this.resources[typeKey].push( { id: importResource.id, content: loadedResource});

                });
        }
    }

    private loadResource(tipoRecurso: ResourceType, importedResource: IImportResource): ResourceContentType {
        switch (tipoRecurso) {
        case ResourceType.font:
            return loadFont((importedResource as IImportResourceFile).path);
        case ResourceType.spriteSheet:
            const spriteSheetImportResource = importedResource as ISpriteImportResource;
            const spriteSheetImage = loadImage(spriteSheetImportResource.path);
            return SpriteSheet.constructFromImportedResource(spriteSheetImportResource, spriteSheetImage);
        case ResourceType.image:
            return loadImage((importedResource as IImportResourceFile).path);
        case ResourceType.sound:
            return new SoundFile((importedResource as IImportResourceFile).path);
        case ResourceType.text:
            return (importedResource as IImportResourceText).content;
        }
    }

    private groupImportResourcesByType(resources: Array<IImportResource>) { 
        // `data` is an array of objects, `key` is the key (or property accessor) to group by
        // reduce runs this anonymous function on each element of `data` (the `item` parameter,
        // returning the `storage` parameter at the end
        const key = 'type';
        return resources.reduce(function(storage: any, item: IImportResource) {
            // get the first instance of the key by which we're grouping
            var group = item[key];
            
            // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
            storage[group] = storage[group] || [];
            
            // add this item to its group within `storage`
            storage[group].push(item);
            
            // return the updated storage to the reduce function, which will then loop through the next 
            return storage; 
        }, {}) as Record<ResourceType, Array<IImportResource>>; // {} is the initial value of the storage
    }

    private recolorirSpriteSheets() {
        let coloredSpriteSheets : Array<IResource> = [];
        this.resources[ResourceType.spriteSheet].forEach(resource => {
            const spriteSheet = resource.content as ISpriteSheet;
            if (spriteSheet.recolor && spriteSheet.recolor.length > 0) {
                coloredSpriteSheets = coloredSpriteSheets.concat(spriteSheet.generateColoredSpriteSheets(this));
            }
        });
        if (coloredSpriteSheets && coloredSpriteSheets.length > 0){
            this.resources[ResourceType.spriteSheet] = this.resources[ResourceType.spriteSheet].concat(coloredSpriteSheets);
        }
    }
}

//   private createAnimations() {
//     let spriteSheetList = [] as Array<Sprite|undefined>;
//     spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_green"))
//     spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_blue"))
    

//     this.animacoes.blinkSlime =  new MultipleSpriteAnimation(
//       AnimationList.blinkSlime,
//       spriteSheetList.filter(s => s) as Array<Sprite>,
//       [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [1,7], 
//        [1,8], [1,9], [1,10], [1,11], [1,12], [1,13], [1,14]], 
//       true,
//       4,
//       true);
  

//     spriteSheetList = [] as Array<Sprite|undefined>;
//     spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "dog_green"));

//     this.animacoes.dogLeft = new SingleSpriteAnimation(
//       AnimationList.dogLeft,
//       spriteSheetList.find(s => s) as Sprite,
//       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
//         15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
//        true,
//        0,
//        false,
//        82, 60
//     );
  
//     spriteSheetList = [] as Array<Sprite|undefined>;
//     spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "dog_red"));

//     this.animacoes.dogRight = new SingleSpriteAnimation(
//       AnimationList.dogRight,
//       spriteSheetList.find(s => s) as Sprite,
//       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
//        15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
//        true,
//        0,
//        true,
//        164, 120
//     );
  
//     spriteSheetList = [] as Array<Sprite|undefined>;
//     spriteSheetList.push(this.getRecurso<Sprite>(ResourceType.spriteSheet, "slime_red"));

//     this.animacoes.dogRight =  new SingleSpriteAnimation(
//       AnimationList.slime,
//       spriteSheetList.find(s => s) as Sprite,
//       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
//       true,
//       0,
//       true);
  
//   }
// }