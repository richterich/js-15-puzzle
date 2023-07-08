/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import NewGame from './NewGame';
import CurrentMoves from './CurrentMoves';
import BestMoves from './BestMoves';
import PlayTime from './PlayTime';

/**
 * @class Scoreboard - ...
 */
class Scoreboard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.newGame = undefined;
        this.currentMoves = undefined;
        this.bestMoves = undefined;
        this.playTime = undefined;
    }

    createBoard() {
        this.currentMoves = new CurrentMoves(this.scene, 386, 172, 'moves');
        this.bestMoves = new BestMoves(this.scene, 542, 172, 'moves');
        this.newGame = new NewGame(this.scene, 32, 186, 'outNewGame');
        this.playTime = new PlayTime(this.scene, 32, 60);
        this.currentMoves.createCurrentMoves();
        this.bestMoves.createBestMoves();
        this.newGame.createNewGame();
        this.newGame.setUpInputListener();
        this.playTime.createPlayTime();
    }

    updateBoard() {
        this.currentMoves.updateMoves();
        this.bestMoves.updateMoves();
        this.playTime.updateTime();
    }

    updateBestScore() {
        const current = this.currentMoves.amount;
        this.bestMoves.replace(current);
        this.bestMoves.animateBestMoves();
    }

    stopPlayTime() {
        this.playTime.stopTime();
    }

    countPlayTime() {
        this.playTime.resetTime();
        this.playTime.startTime();
    }

    resetPlayTime() {
        this.playTime.stopTime();
        this.playTime.resetTime();
    }

    increaseAmountOfMoves() {
        this.currentMoves.increase();
    }

    resetCurrentMoves() {
        this.currentMoves.reset();
        this.currentMoves.animateCurrentMoves();
    }

    get isNewRecord() {
        const best = this.bestMoves.amount;
        const current = this.currentMoves.amount;
        return best > current || best === 0;
    }

    get isPlayTime() {
        return !this.playTime.onPause;
    }
}

export default Scoreboard;
