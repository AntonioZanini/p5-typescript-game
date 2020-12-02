import { ModifierType } from "../enums";
import { IModifier } from "./interfaces";

export function getSumModifier(
    xPos: number = 0,
    yPos: number = 0,
    width: number = 0,
    height: number = 0) : IModifier {

        return {
            type: ModifierType.Sum,
            xPos,
            yPos,
            width,
            height
        };
    }

export function getMultModifier(
    xPos: number = 1,
    yPos: number = 1,
    width: number = 1,
    height: number = 1) : IModifier {

        return {
            type: ModifierType.Multiply,
            xPos,
            yPos,
            width,
            height
        };
    }