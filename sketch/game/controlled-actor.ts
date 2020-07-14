class ControlledActor extends MobileActor {
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
            if (direction == DirectionType.left) { moveVal *= -1; }
            if (this.directionalControls[direction]) {
                this.directionalControls[direction].forEach( keyValue => {
                    if (keyIsDown(keyValue)) { this.move(direction, moveVal); }
                });
            }
        }
    }
}