/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';

/**
 * @class BestMoves - ...
 */
class BestMoves extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.amount = 0;
    }

    createBestMoves() {
        this.scene.add.existing(this);
    }

    replace(amount) {
        this.amount = amount;
    }

    updateMoves() {
    }
}

export default BestMoves;
