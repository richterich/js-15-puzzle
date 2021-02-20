/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import Combination from './Combination';
import Tiles from './Tiles';
import Scoreboard from './ui/Scoreboard';

class PuzzleGame extends Phaser.Scene {
    constructor() {
        super('puzzleGame');
        this.GAME_WIDTH = 720;
        this.GAME_HEIGHT = 1280;
        this.tiles = undefined;
        this.combination = undefined;
        this.frame = undefined;
        this.parent = undefined;
        this.sizer = undefined;
    }

    create() {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(
            this.GAME_WIDTH,
            this.GAME_HEIGHT,
            Phaser.Structs.Size.FIT,
            this.parent
        );

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();

        this.scale.on('resize', this.resize, this);

        this.frame = this.add.image(32, 312, 'boardFrame').setOrigin(0, 0);
        this.scoreboard = new Scoreboard(this, 0, 0);
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

    resize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();
    }

    updateCamera() {
        const camera = this.cameras.main;

        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = Math.ceil((this.parent.height - this.sizer.height) * 0.5);
        const scaleX = this.sizer.width / this.GAME_WIDTH;
        const scaleY = this.sizer.height / this.GAME_HEIGHT;

        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
    }
}

export default PuzzleGame;
