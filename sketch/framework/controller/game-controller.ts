import { IGameController, IScoreItem }  from './interfaces';

export default class GameController implements IGameController {
    private scoreBoard: Array<IScoreItem>;

    constructor() {
        this.scoreBoard = [];
    }

    newGame(): void {
        this.scoreBoard.push({
            name: "", 
            score: 0 
        });
    }

    getCurrentScore(): number {
        if (this.scoreBoard.length <= 0) { return 0; }
        return this.getCurrentScoreItem().score;
    }
    addScorePoints(pointsAdded: number): void {
        this.getCurrentScoreItem().score += abs(pointsAdded);
    }
    removeScorePoints(pointsRemoved: number): void {
        this.getCurrentScoreItem().score -= abs(pointsRemoved);
    }
    private getCurrentScoreItem(): IScoreItem {
        return this.scoreBoard[this.scoreBoard.length - 1]
    }
    setScoreName(name: string): void {
        this.getCurrentScoreItem().name = name;
    }

}