import { SizeType, DirectionType } from '../enums_old';
import { IRectangle, IMoveAnimations, IActorState, IDirectionalControls } from '../interfaces';
import { MobileActor } from './mobile-actor'

export class ControlledActor extends MobileActor {

    protected directionalControls: IDirectionalControls;

    /**
     *
     */
    constructor(
        location: IRectangle,
        sizeType: SizeType,
        moves: IMoveAnimations,
        initialDirection: DirectionType,
        directionalControls: IDirectionalControls,
        states?: Array<IActorState>

    ) {
        super(
            location,
            sizeType,
            moves,
            initialDirection,
            states
        );

        this.directionalControls = directionalControls;
        
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