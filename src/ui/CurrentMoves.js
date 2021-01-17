/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';

/**
 * @class CurrentMoves - ...
 */
class CurrentMoves extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.amount = 0;
    }

    createCurrentMoves() {
        this.scene.add.existing(this);
    }

    increase() {
        this.amount++;
    }

    reset() {
        this.amount = 0;
    }

    updateMoves() {
    }
}

export default CurrentMoves;
