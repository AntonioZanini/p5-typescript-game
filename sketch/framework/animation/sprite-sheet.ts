import { ISpriteSheet, ICoord, IShape, ISpriteFrame } from './interfaces'
import { AvailableColor, ShapeType } from '../enums'
import { IRecolor, IResource, IResourceController, ISpriteImportResource } from '../controller/interfaces';

export class SpriteSheet implements ISpriteSheet {
    id: string;
    spriteSheet: p5.Image;
    spriteWidth: number;
    spriteHeight: number;
    spriteNumber: number;
    spritesByRow: number;
    recolors?: Array<IRecolor>;
    private frameArray: Array<ICoord>;

    constructor(
        id: string,
        spriteSheet: p5.Image,
        spriteWidth: number,
        spriteHeight: number,
        spriteNumber: number,
        spritesByRow: number,
        recolors?: Array<IRecolor>
    ) {
        this.id = id;
        this.spriteSheet = spriteSheet;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spriteNumber = spriteNumber;
        this.spritesByRow = spritesByRow;
        this.recolors = recolors;
    }

    static constructFromImportedResource(
        importedResource : ISpriteImportResource, 
        spriteSheetImage: p5.Image) : ISpriteSheet {

        return new SpriteSheet(
            importedResource.id,
            spriteSheetImage,
            importedResource.spriteWidth,
            importedResource.spriteHeight,
            importedResource.spriteNumber,
            importedResource.spritePerRow,
            importedResource.recolors
        );
    }

    drawSprite(spriteFrame: ISpriteFrame, location: IShape): void {
        const hModifier = spriteFrame.hReverse ? -1 : 1;
        const vModifier = spriteFrame.vReverse ? -1 : 1;
        push();
        scale(hModifier, vModifier);
        image(
            this.spriteSheet,
            location.xPos * hModifier,
            location.yPos * vModifier,
            location.width,
            location.height,
            this.frameArray[spriteFrame.spriteNumber].xPos,
            this.frameArray[spriteFrame.spriteNumber].yPos,
            this.spriteWidth,
            this.spriteHeight
        );
        scale(1, 1);
        pop();
    }

    drawCollisionShape(spriteFrame: ISpriteFrame, collisionShape: IShape) {
        const hModifier = spriteFrame.hReverse ? -1 : 1;
        const vModifier = spriteFrame.vReverse ? -1 : 1;
        if (collisionShape.shapeType = ShapeType.circle) {
            noFill();
            circle(
                collisionShape.xPos * hModifier,
                collisionShape.yPos * vModifier,
                collisionShape.diameter
            );
        }
    }

    generateColoredSpriteSheets(resourceController: IResourceController): Array<IResource> {
        const colors = this.recolors as Array<IRecolor>;
        const recolorList: Array<IResource> = [];
        colors.forEach(recolor => {
            const tintedImage = this.tintSpriteSheet(resourceController, recolor.colorName);
            const itemID = `${this.id}_${recolor.sufix}`;
            recolorList.push({
                id: itemID,
                content: new SpriteSheet(
                            `${this.id}_${recolor.sufix}`,
                            tintedImage,
                            this.spriteWidth,
                            this.spriteHeight,
                            this.spriteNumber,
                            this.spritesByRow
                )});
        });
        return recolorList;
    }

    private tintSpriteSheet(resourceController: IResourceController, color: AvailableColor) : p5.Image {
        const graphics = createGraphics(this.spriteSheet.width, this.spriteSheet.height);

        graphics.imageMode(CORNER);
        graphics.tint(resourceController.getColor(color));
        graphics.image(this.spriteSheet, 0, 0);
        const tintedImage = graphics.get();
        graphics.noTint();
        return tintedImage;
    }
}


