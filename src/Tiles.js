/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
const ATLAS_NAME = 'tiles';
const TILE_NAMES = [
    'tile1',
    'tile2',
    'tile3',
    'tile4',
    'tile5',
    'tile6',
    'tile7',
    'tile8',
    'tile9',
    'tile10',
    'tile11',
    'tile12',
    'tile13',
    'tile14',
    'tile15',
];
const alignConfig = {
    width: 4,
    height: 4,
    cellWidth: 159,
    cellHeight: 159,
    x: 121.5,
    y: 401.5,
};

import Phaser from 'phaser';
import Tile from './Tile';

const events = Phaser.Input.Events;

/**
 * @class Tiles
 */
class Tiles extends Phaser.GameObjects.Group {
    constructor(scene, combination, scoreboard) {
        super(scene, {
            classType: Tile,
            key: ATLAS_NAME,
            frame: TILE_NAMES,
            gridAlign: alignConfig,
        });
        this.combination = combination;
        this.scoreboard = scoreboard;
        this.firstMoveWasDone = false;
    }

    randomCombination() {
        this.combination.align();
        this.combination.shuffle();
        if (!this.combination.isSolvable()) {
            this.combination.rotateLeft();
        }
        this.updateFrames(this.combination.values);
        this.updatePositions(this.combination.values);
        this.firstMoveWasDone = false;
    }

    updateFrames(values) {
        for (let i = 0, j = 0; i < values.length; ++i) {
            if (values[i] !== 0) {
                this.children.entries[j].setFrame('tile' + values[i]);
                ++j;
            }
        }
    }

    updatePositions(values) {
        let x = 0,
            y = 0;
        for (let i = 0, j = 0; i < values.length; ++i) {
            x = Math.floor(i % alignConfig.width) * alignConfig.cellWidth + alignConfig.x;
            y = Math.floor(i / alignConfig.height) * alignConfig.cellHeight + alignConfig.y;
            if (values[i] !== 0) {
                this.children.entries[j].setPosition(x, y);
                ++j;
            }
        }
    }

    setUpInputListener() {
        const setUpInputHandlers = (tile) => {
            tile.on(events.POINTER_DOWN, () => {
                if (!this.firstMoveWasDone) {
                    this.firstMoveWasDone = true;
                    this.scoreboard.countPlayTime();
                }
                let emptyIndex = this.combination.emptyIndex();
                let emptyPosition = this.combination.gridPosition(emptyIndex);
                let blank = new Phaser.Math.Vector2(emptyPosition);
                let hit = { x: 0, y: 0 };
                hit.x = (tile.x - alignConfig.x) / alignConfig.cellWidth;
                hit.y = (tile.y - alignConfig.y) / alignConfig.cellHeight;
                let hitIndex = this.combination.arrayIndex(hit);
                let direction = blank.subtract(hit);
                if (direction.equals(Phaser.Math.Vector2.LEFT)) {
                    this.scoreboard.increaseAmountOfMoves();
                    this.combination.swapTiles(hitIndex, emptyIndex);
                    tile.moveLeft();
                    tile.animate();
                } else if (direction.equals(Phaser.Math.Vector2.DOWN)) {
                    this.scoreboard.increaseAmountOfMoves();
                    this.combination.swapTiles(hitIndex, emptyIndex);
                    tile.moveDown();
                    tile.animate();
                } else if (direction.equals(Phaser.Math.Vector2.RIGHT)) {
                    this.scoreboard.increaseAmountOfMoves();
                    this.combination.swapTiles(hitIndex, emptyIndex);
                    tile.moveRight();
                    tile.animate();
                } else if (direction.equals(Phaser.Math.Vector2.UP)) {
                    this.scoreboard.increaseAmountOfMoves();
                    this.combination.swapTiles(hitIndex, emptyIndex);
                    tile.moveUp();
                    tile.animate();
                }
            });
            tile.setInteractive();
        };
        this.children.iterate(setUpInputHandlers);
    }

    animateCombination() {
        this.scene.tweens.add({
            targets: [...this.children.entries],
            alpha: { from: 0, to: 1 },
            duration: 1200,
        });
    }

    isPutTogether() {
        return 0 === this.combination.inversions();
    }
}

export default Tiles;
