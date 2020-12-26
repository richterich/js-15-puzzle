/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import Combination from './Combination';
import Tiles from './Tiles';

class PuzzleGame extends Phaser.Scene {
    constructor() {
        super('puzzleGame');
        this.emojis;
        this.combination;
    }

    create() {
        this.emojis = new Tiles(this, new Combination());
        this.emojis.randomCombination();
        this.emojis.setUpInputListener();

        this.tweens.add({
            targets: this.emojis.getChildren(),
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });
    }
}

export default PuzzleGame;
