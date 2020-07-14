import { SizeType, DirectionType } from '../enums';
import { IRectangle, IMoveAnimations, IActorState, IDirectionalControls } from '../interfaces';
import { MobileActor } from './mobile-actor'

export class ControlledActor extends MobileActor {
    /**
     *
     */
    constructor(
        location: IRectangle,
        sizeType: SizeType,
        moves: IMoveAnimations,
        initialDirection: DirectionType,
        protected directionalControls: IDirectionalControls,
        states?: Array<IActorState>

    ) {
        super(
            location,
            sizeType,
            moves,
            initialDirection,
            states
        );
        
    }

    keyIsPressed() {
        let moveVal = 10;
        for(let dirControl in this.directionalControls) {
            let direction = dirControl as DirectionType;
            let controls = this.directionalControls[direction];
            if (direction == DirectionType.left) { moveVal *= -1; }
            if (controls) {
                controls.forEach( keyValue => {
                    if (keyIsDown(keyValue)) { this.move(direction, moveVal); }
                });
            }
        }
    }
}