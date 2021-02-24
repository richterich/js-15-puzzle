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

    moveRight(offSet) {
        this.x += offSet;
    }

    moveLeft(offSet) {
        this.x -= offSet;
    }

    moveUp(offSet) {
        this.y -= offSet;
    }

    moveDown(offSet) {
        this.y += offSet;
    }

    animate() {
        this.scene.tweens.add({
            targets: this,
            scale: { from: 0.2, to: 1 },
            duration: 150
        });
    }
}

export default Tile;
