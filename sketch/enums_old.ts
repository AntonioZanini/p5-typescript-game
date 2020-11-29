export type ResourceName = 'IMAGEM' | 'SOM' | 'FONTE' | 'TEXTO' | "SPRITESHEET";
export type ColorName = 'azul' | 'verde' | 'vermelho' | 'amarelo' | 'laranja' | 'rosa' | 'transparente';

export enum ResourceType {
    image = "IMAGEM",
    spriteSheet = "SPRITESHEET",
    sound = "SOM",
    font = "FONTE",
    text = "TEXTO"
}

export enum ColisionType {
    rect,
    circle
}

export enum SizeType {
    fixed,
    dynamic
}

export enum DirectionType {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right'
}

export enum AnimationList {
    blinkSlime = 'blinkSlime',
    dogLeft = 'dogLeft',
    dogRight = 'dogRight',
    slime = 'slime'
}