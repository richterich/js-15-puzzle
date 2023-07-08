/**
 * @author      Alexander Richterich <alexander@richterich.dev>
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
        this.label = undefined;
    }

    createNewGame() {
        this.scene.add.existing(this);
        this.setOrigin(0, 0);
        this.label = this.scene.add.text(68, 216, 'New Game', {
            fontFamily: 'FreeSans',
            fontSize: '22px',
            fontStyle: 'bold'
        });
        this.label.setColor('#ffffff');
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
