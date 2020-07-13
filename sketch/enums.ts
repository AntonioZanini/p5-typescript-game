type ResourceName = 'IMAGEM' | 'SOM' | 'FONTE' | 'TEXTO' | "SPRITESHEET";
type ColorName = 'azul' | 'verde' | 'vermelho' | 'amarelo' | 'laranja' | 'rosa' | 'transparente';
enum ResourceType {
    image = "IMAGEM",
    spriteSheet = "SPRITESHEET",
    sound = "SOM",
    font = "FONTE",
    text = "TEXTO"
}

enum ColisionType {
    rect,
    circle
}

enum SizeType {
    fixed,
    dynamic
}