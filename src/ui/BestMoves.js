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
        this.setOrigin(0, 0);
        this.label = this.scene.add.text(595, 186, 'BEST', {
            fontFamily: 'FreeSans',
            fontSize: '16px',
            fontStyle: 'bold'
        });
        this.label.setColor('#a2f7fc');
        this.bestMoves = this.scene.add.text(615, 236, '', {
            fontFamily: 'FreeSans',
            fontSize: '60px',
            fontStyle: 'bold'
        });
        this.bestMoves.setOrigin(0.5, 0.5);
        this.bestMoves.setColor('#ffffff');
    }

    replace(amount) {
        this.amount = amount;
    }

    updateMoves() {
        this.bestMoves.text = this.amount;
    }
}

export default BestMoves;
