import { DirectionType, SizeType } from '../enums_old'
import { IRectangle, IMoveAnimations, IActorState } from '../interfaces';
import { Actor } from './actor';

export class MobileActor extends Actor {
    
    protected currentMove: DirectionType;
    protected moves: IMoveAnimations;
    protected states?: Array<IActorState>;

    constructor(
        location: IRectangle,
        sizeType: SizeType,
        moves: IMoveAnimations,
        initialDirection: DirectionType,
        states?: Array<IActorState>
    ) {
        super(location, sizeType);
        
        this.moves = moves;
        this.states = states;
        this.currentMove = initialDirection;   
    }

    draw() {
        let selectedAnimation = this.moves[this.currentMove];
        if (selectedAnimation) {
            super.draw(selectedAnimation.animate());
        }
    }

    move(direction: DirectionType, distance: number) {
        this.adjustImageBox(direction);
        this.currentMove = direction;
        this.location.posX += distance;
    }

    private adjustImageBox(direction: DirectionType) {
        if (this.currentMove == DirectionType.left &&
            direction == DirectionType.right) {
            this.location.posX += this.location.width;
        }
        if (this.currentMove == DirectionType.right &&
            direction == DirectionType.left) {
            this.location.posX -= this.location.width;
        }
        if (this.currentMove == DirectionType.up &&
            direction == DirectionType.down) {
            this.location.posY += this.location.height;
        }
        if (this.currentMove == DirectionType.down &&
            direction == DirectionType.up) {
            this.location.posY -= this.location.height;
        }
    }
}