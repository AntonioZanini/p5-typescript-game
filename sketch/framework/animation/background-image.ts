import { IResourceController } from "../controller/interfaces";
import { ModifierType, ResourceContentType, ResourceType } from "../enums";
import { IBackgroundImage, IModifier, IShape } from "./interfaces";
import Shape from "./shape";

export default class BackgroundImage implements IBackgroundImage {
    private imageA: p5.Image;
    imageID: string;
    cutShape: IShape;
    location: IShape;

    constructor(imageID: string) {
        this.imageID = imageID;
        this.cutShape = Shape.createRect(0, 0, 800, 600);
        this.location = Shape.createRect(0, 0, 800, 600);;
    }

    load(resourceController: IResourceController): void {
        this.imageA = resourceController.getResource<p5.Image>(ResourceType.image, this.imageID);
    }

    update(modifier: IModifier): void {
        if (modifier.type == ModifierType.Multiply ) {
            this.location.xPos *= modifier.xPos;
            this.location.yPos *= modifier.yPos;
            this.location.width *= modifier.width;
            this.location.height *= modifier.height;
        } else if (modifier.type == ModifierType.Sum) {
            this.location.xPos += modifier.xPos;
            this.location.yPos += modifier.yPos;
            this.location.width += modifier.width;
            this.location.height += modifier.height;
        }
        if (this.location.xPos > 0) { 
            this.location.xPos = -this.location.getScaledVersion().width;  
        }
        if (this.location.xPos < -this.location.getScaledVersion().width) { 
            this.location.xPos = 0;  
        }
    }

    draw(): void {
        image(
            this.imageA,
            this.location.xPos,
            this.location.yPos,
            this.location.getScaledVersion().width,
            this.location.getScaledVersion().height,
            this.cutShape.xPos,
            this.cutShape.yPos,
            this.cutShape.width,
            this.cutShape.height
        );
        image(
            this.imageA,
            this.location.xPos + this.location.getScaledVersion().width,
            this.location.yPos,
            this.location.getScaledVersion().width,
            this.location.getScaledVersion().height,
            this.cutShape.xPos,
            this.cutShape.yPos,
            this.cutShape.width,
            this.cutShape.height
        );
    }

}