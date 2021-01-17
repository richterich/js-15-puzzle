/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';

const events = Phaser.Input.Events;

/**
 * @class NewGame ...
 */
class NewGame extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    createNewGame() {
        this.scene.add.existing(this);
    }

    setUpInputListener() {
        this.on(events.POINTER_OVER, () => {
            this.setTexture('overNewGame');
        });
        this.on(events.POINTER_OUT, () => {
            this.setTexture('outNewGame');
        });
        this.on(events.POINTER_DOWN, () => {
            this.setTexture('downNewGame');
        });
        this.on(events.POINTER_UP, () => {
            this.setTexture('overNewGame');
            this.scene.newGame();
        });
        this.setInteractive();
    }
}

export default NewGame;
