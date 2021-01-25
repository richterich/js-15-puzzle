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
        this.label = undefined;
        this.bestMoves = undefined;
    }

    createBestMoves() {
        this.scene.add.existing(this);
        this.label = this.scene.add.text(this.x, this.y - 15, 'Best:', {
            fontFamily: '"Montserrat"',
            fontSize: '12px',
        });
        this.label.setOrigin(0.5, 0.5);
        this.label.setColor('#2c2c2e');
        this.bestMoves = this.scene.add.text(this.x, this.y + 8, '', {
            fontFamily: '"Montserrat"',
            fontSize: '30px',
        });
        this.bestMoves.setOrigin(0.5, 0.5);
        this.bestMoves.setColor('#2c2c2e');
    }

    replace(amount) {
        this.amount = amount;
    }

    updateMoves() {
        this.bestMoves.text = this.amount;
    }
}

export default BestMoves;
