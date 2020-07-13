class Player extends Actor {
    
    constructor(
        location: IRectangle,
        sizeType: SizeType,
        private states: Array<IActorState>
    ) {
        super(location, sizeType);
        
    }
}