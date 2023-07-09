/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import CameraScale from '../components/CameraScale';
import Combination from '../Combination';
import Tiles from '../Tiles';
import Scoreboard from '../ui/Scoreboard';
import Congratulation from '../ui/Congratulation';

class PuzzleGame extends Phaser.Scene {
    constructor () {
        super('game');
        this.tiles = undefined;
        this.congratulation = undefined;
        this.combination = undefined;
        this.frame = undefined;
    }

    create () {
        // layer
        const layer = this.add.layer();

        // cameraScale (component)
        const cameraScale = new CameraScale(layer);
        cameraScale.gameWidth = 720;
        cameraScale.gameHeight = 1280;

        this.frame = this.add.image(32, 312, 'boardFrame').setOrigin(0, 0);
        this.scoreboard = new Scoreboard(this, 0, 0);
        this.tiles = new Tiles(this, new Combination(), this.scoreboard);
        this.congratulation = new Congratulation(this, 360, 640, 'congratulation');
        this.scoreboard.createBoard();
        this.tiles.setUpInputListener();
        this.congratulation.createCongratulation();
        this.refreshPuzzle();

        this.events.emit('scene-awake');
    }

    newGame () {
        this.refreshPuzzle();
        this.scoreboard.resetCurrentMoves();
        this.scoreboard.resetPlayTime();
    }

    update (time, delta) {
        super.update(time, delta);
        this.scoreboard.updateBoard();
        if (this.scoreboard.isPlayTime && this.tiles.isPutTogether) {
            this.scoreboard.stopPlayTime();
            if (this.scoreboard.isNewRecord) {
                this.scoreboard.updateBestScore();
            }
            this.scoreboard.resetCurrentMoves();
            this.congratulation.show();
            this.congratulation.congratulate(() => {
                this.congratulation.hide();
                this.refreshPuzzle();
            });
        }
    }

    refreshPuzzle () {
        this.tiles.animateCombination();
        this.tiles.randomCombination();
    }
}

export default PuzzleGame;
