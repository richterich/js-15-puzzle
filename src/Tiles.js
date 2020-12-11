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

import Phaser from 'phaser';
import Tile from './Tile';
/**
 * @class Tiles
 */
class Tiles extends Phaser.GameObjects.Group {
    constructor(scene, combination) {
        super(scene, {
            classType: Tile,
            key: ATLAS_NAME,
            frame: TILE_NAMES,
            gridAlign: {
                width: 4,
                height: 4,
                cellWidth: 90,
                cellHeight: 90,
                x: 280,
                y: 200,
            },
        });
        this.combination = combination;
    }

    setUpInputListener() {
        const setUpInputHandlers = (tile) => {
            tile.setInteractive();
            tile.on('pointerdown', (pointer) => {
                let emptyIndex = this.combination.emptyIndex();
                let emptyPosition = this.combination.gridPosition(emptyIndex);
                let blank = new Phaser.Math.Vector2(emptyPosition);
                let hit = pointer.position.subtract({ x: 280, y: 200 });
                hit.x = Math.round(Math.abs(hit.x) / 90);
                hit.y = Math.round(Math.abs(hit.y) / 90);
                let hitIndex = this.combination.arrayIndex(hit);
                let direction = blank.subtract(hit);
                if (direction.equals(Phaser.Math.Vector2.LEFT)) {
                    this.combination.swapTiles(hitIndex, emptyIndex);
                    tile.moveLeft();
                } else if (direction.equals(Phaser.Math.Vector2.DOWN)) {
                    this.combination.swapTiles(hitIndex, emptyIndex);
                    tile.moveDown();
                } else if (direction.equals(Phaser.Math.Vector2.RIGHT)) {
                    this.combination.swapTiles(hitIndex, emptyIndex);
                    tile.moveRight();
                } else if (direction.equals(Phaser.Math.Vector2.UP)) {
                    this.combination.swapTiles(hitIndex, emptyIndex);
                    tile.moveUp();
                }
            });
        };
        this.children.iterate(setUpInputHandlers);
    }
}

export default Tiles;
