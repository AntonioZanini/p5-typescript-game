import { ShapeType } from "../enums";
import { IShape } from "./interfaces";

export default class Shape implements IShape {
    shapeType: ShapeType;
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    diameter: number;
    globalScale: number;

    private constructor(
        shapeType: ShapeType,
        xPos: number,
        yPos: number,
        width: number,
        height: number,
        diameter: number,
        globalScale: number
    ) {
        this.shapeType = shapeType;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.diameter = diameter;
        this.globalScale = globalScale;
    }

    static createRect(
        xPos: number,
        yPos: number,
        width: number,
        height: number,
        globalScale: number = 1
    ) : IShape {
        return new Shape(
            ShapeType.rect,
            xPos,
            yPos,
            width,
            height,
            0,
            globalScale
        );
    }

    static createCircle(
        xPos: number,
        yPos: number,
        diameter: number,
        globalScale: number = 1
    ) : IShape {
        return new Shape(
            ShapeType.circle,
            xPos,
            yPos,
            0,
            0,
            diameter,
            globalScale
        );
    }

    getScaledVersion() : IShape {
        return new Shape(
            this.shapeType,
            this.xPos,
            this.yPos,
            this.width,
            this.height,
            this.diameter,
            1
        );
    }

    getArray() : Array<Number> {
        if (this.shapeType == ShapeType.rect) {
            return [ this.xPos, this.yPos, this.width, this.height ];
        } else {
            return [ this.xPos, this.yPos, this.diameter ];
        }
    }

}