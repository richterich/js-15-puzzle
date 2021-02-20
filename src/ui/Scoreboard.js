/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import NewGame from './NewGame';
import CurrentMoves from './CurrentMoves';
import BestMoves from './BestMoves';

/**
 * @class Scoreboard - ...
 */
class Scoreboard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.newGame = undefined;
        this.currentMoves = undefined;
        this.bestMoves = undefined;
    }

    createBoard() {
        this.currentMoves = new CurrentMoves(this.scene, 386, 172, 'moves');
        this.bestMoves = new BestMoves(this.scene, 542, 172, 'moves');
        this.newGame = new NewGame(this.scene, 32, 186, 'outNewGame');
        this.currentMoves.createCurrentMoves();
        this.bestMoves.createBestMoves();
        this.newGame.createNewGame();
        this.newGame.setUpInputListener();
    }

    updateBoard() {
        this.currentMoves.updateMoves();
        this.bestMoves.updateMoves();
    }

    updateBestScore() {
        const best = this.bestMoves.amount;
        const current = this.currentMoves.amount;
        if (best === 0 || best > current) {
            this.bestMoves.replace(current);
        }
        this.currentMoves.reset();
    }

    increaseAmountOfMoves() {
        this.currentMoves.increase();
    }

    resetCurrentMoves() {
        this.currentMoves.reset();
    }

    newRecord() {
        const best = this.bestMoves.amount;
        const current = this.currentMoves.amount;
        return best > current;
    }

    congratulate() {
        this.currentMoves.animateCurrentMoves();
    }
}

export default Scoreboard;
