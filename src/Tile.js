/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';

/**
 * @class Tile
 */
class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    moveRight() {
        this.x += 90;
    }

    moveLeft() {
        this.x -= 90;
    }

    moveUp() {
        this.y -= 90;
    }

    moveDown() {
        this.y += 90;
    }
}

export default Tile;
