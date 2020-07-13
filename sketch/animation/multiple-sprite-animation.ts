class MultipleSpriteAnimation implements ISpriteAnimation{
    private currentFrame: number = 0;
    private delay: number = 0;
    constructor(
        public sprites: Array<Sprite>,
        public frameNumberList: Array<[number,number]>,
        public loop: boolean,
        public frameDelay: number = 0,
        public hFlipped: boolean = false,
        public suggestedWidth?: number,
        public suggestedHeight?: number
    ) {
        this.delay = this.frameDelay;
        
    }

    draw(location: IRectangle) {
        const sprite = this.sprites[this.frameNumberList[this.currentFrame][0]];
        sprite.drawFrame(
            this.frameNumberList[this.currentFrame][1], 
            location,
            this.hFlipped
        );
        if (this.currentFrame === this.frameNumberList.length - 1 && 
            this.loop == false) {
            return;
        }

        if (this.delay <= 0) {
            this.currentFrame++;
            this.delay = this.frameDelay;
            if (this.currentFrame >= this.frameNumberList.length) {
                this.currentFrame = (this.loop) ? 0 : this.currentFrame - 1;
            }
        } else {
            this.delay--;
        }
    }

    animate(): ISpriteAnimation {
        return new MultipleSpriteAnimation(
            this.sprites,
            this.frameNumberList,
            this.loop,
            this.frameDelay,
            this.hFlipped,
            this.suggestedWidth,
            this.suggestedHeight
        );
    }

    equals(animation: ISpriteAnimation) {
        if (!(animation instanceof MultipleSpriteAnimation)) { return false; }
        if (this.sprites === animation.sprites &&
            this.frameNumberList === animation.frameNumberList &&
            this.loop === animation.loop &&
            this.frameDelay === animation.frameDelay &&
            this.hFlipped === animation.hFlipped &&
            this.suggestedWidth == animation.suggestedWidth &&
            this.suggestedHeight == animation.suggestedHeight) {
                return true;
        }
        return false;
    }
}