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
        this.scene.add.image(this.x, this.y, 'panelFrame');
        this.currentMoves = new CurrentMoves(this.scene, 455, this.y, 'moves');
        this.bestMoves = new BestMoves(this.scene, 565, this.y, 'moves');
        this.newGame = new NewGame(this.scene, 235, this.y+10, 'outNewGame');
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
        let best = this.bestMoves.amount;
        let current = this.currentMoves.amount;
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
        let best = this.bestMoves.amount;
        let current = this.currentMoves.amount;
        return best > current;
    }

    congratulate() {
        this.currentMoves.animateCurrentMoves();
    }
}

export default Scoreboard;
