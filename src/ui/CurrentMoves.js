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
        this.label = undefined;
        this.currentMoves = undefined;
    }

    createCurrentMoves() {
        this.scene.add.existing(this);
        this.label = this.scene.add.text(this.x, this.y - 15, 'Current:', {
            fontFamily: '"Montserrat"',
            fontSize: '12px',
        });
        this.label.setColor('#2C2C2E');
        this.label.setOrigin(0.5, 0.5);
        this.currentMoves = this.scene.add.text(this.x, this.y + 8, '', {
            fontFamily: '"Montserrat"',
            fontSize: '30px',
        });
        this.currentMoves.setColor('#2c2c2e');
        this.currentMoves.setOrigin(0.5, 0.5);
    }

    increase() {
        this.amount++;
    }

    reset() {
        this.amount = 0;
    }

    updateMoves() {
        this.currentMoves.text = this.amount;
    }

    animateCurrentMoves() {
        console.log(`Congrats! Your moves is ${this.amount}`);
    }
}

export default CurrentMoves;
