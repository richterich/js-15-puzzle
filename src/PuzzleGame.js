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
        this.tiles = undefined;
        this.combination = undefined;
        this.frame = undefined;
    }

    create() {
        this.frame = this.add.image(GameConfig.width / 2, GameConfig.height / 2, 'tilesFrame');
        this.scoreboard = new Scoreboard(this, GameConfig.width / 2, 35);
        this.tiles = new Tiles(this, new Combination(), this.scoreboard);
        this.scoreboard.createBoard();
        this.tiles.setUpInputListener();
        this.refreshPuzzle();
    }

    newGame() {
        this.refreshPuzzle();
        this.scoreboard.resetCurrentMoves();
    }

    update(time, delta) {
        super.update(time, delta);
        this.scoreboard.updateBoard();
        if (this.tiles.isPutTogether()) {
            if (this.scoreboard.newRecord()) {
                this.scoreboard.congratulate();
            }
            this.scoreboard.updateBestScore();
            this.refreshPuzzle();
        }
    }

    refreshPuzzle() {
        this.tiles.animateCombination();
        this.tiles.randomCombination();
    }
}

export default PuzzleGame;
