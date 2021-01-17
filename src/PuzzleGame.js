/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import Combination from './Combination';
import Tiles from './Tiles';
import GameConfig from './GameConfig';
import Scoreboard from './ui/Scoreboard';

class PuzzleGame extends Phaser.Scene {
    constructor() {
        super('puzzleGame');
        this.emojis = undefined;
        this.combination = undefined;
        this.frame = undefined;
    }

    create() {
        this.frame = this.add.image(GameConfig.width / 2, GameConfig.height / 2, 'tilesFrame');
        this.scoreboard = new Scoreboard(this, GameConfig.width / 2, 35);
        this.emojis = new Tiles(this, new Combination(), this.scoreboard);
        this.scoreboard.createBoard();
        this.emojis.setUpInputListener();
        this.newGame();
    }

    newGame() {
        this.startAnimation();
        this.emojis.randomCombination();
        this.scoreboard.updateBestScore();
    }

    startAnimation() {
        this.tweens.add({
            targets: [...this.emojis.getChildren(), this.frame],
            alpha: {from: 0, to: 1},
            duration: 1200,
        });
    }

    update(time, delta) {
        super.update(time, delta);
        this.scoreboard.updateBoard();
    }
}

export default PuzzleGame;
