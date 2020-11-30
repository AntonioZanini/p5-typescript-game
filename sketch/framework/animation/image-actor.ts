import { IScene } from "../controller/interfaces";
import { IImage, IImageActor, IShape } from "./interfaces";

export default class ImageActor implements IImageActor {
    scene: IScene<any>;
    shape: IShape;
    private image: IImage;

    constructor(image: IImage, shape: IShape) {
        this.image = image;
        this.shape = shape;
    }

    setImage(image: IImage): void {
        this.image = image;
    }

    update(): void {
        
    }

    draw(): void {
        image(
            this.image.image,
            this.shape.xPos,
            this.shape.yPos,
            this.shape.width,
            this.shape.height,
            this.image.position.xPos,
            this.image.position.yPos,
            this.image.position.width,
            this.image.position.height
        );
    }

}