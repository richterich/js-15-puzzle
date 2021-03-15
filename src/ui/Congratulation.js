/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';

/**
 * @class Congratulation - ...
 */
class Congratulation extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.TEXT = 'Won The Game!\n   \n   Keep Going!';
        this.label = undefined;
    }

    createCongratulation() {
        this.scene.add.existing(this);
        this.setVisible(false);
        this.setOrigin(0.5);
        this.label = this.scene.add.text(this.x, this.y, this.TEXT, {
            fontFamily: 'FreeSans',
            fontSize: '60px',
            fontStyle: 'bold',
        });
        this.label.setVisible(false);
        this.label.setOrigin(0.5);
        this.label.setColor('#ffffee');
    }

    show() {
        this.setDepth(99);
        this.label.setDepth(100);
        this.setVisible(true);
        this.label.setVisible(true);
    }

    congratulate(callback) {
        this.scene.tweens.add({
            targets: [this, this.label],
            scale: { from: 0, to: 1 },
            duration: 100,
            delay: 50,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: [this, this.label],
                    scale: { from: 1, to: 0 },
                    duration: 50,
                    delay: 2200,
                    onComplete: callback,
                });
            },
        });
    }

    hide() {
        this.label.setDepth(0);
        this.setDepth(0);
        this.label.setVisible(false);
        this.setVisible(false);
    }
}

export default Congratulation;
