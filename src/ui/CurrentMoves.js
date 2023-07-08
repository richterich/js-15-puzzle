/**
 * @author      Alexander Richterich <alexander@richterich.dev>
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
        this.setOrigin(0, 0);
        this.label = this.scene.add.text(423, 186, 'CURRENT', {
            fontFamily: 'FreeSans',
            fontSize: '16px',
            fontStyle: 'bold'
        });
        this.label.setColor('#a2f7fc');
        this.currentMoves = this.scene.add.text(460, 236, '', {
            fontFamily: 'FreeSans',
            fontSize: '60px',
            fontStyle: 'bold'
        });
        this.currentMoves.setColor('#ffffff');
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
        this.scene.tweens.add({
            targets: this.currentMoves,
            scale: { from: 0.1, to: 1 },
            duration: 150,
            delay: 50
        });
    }
}

export default CurrentMoves;
