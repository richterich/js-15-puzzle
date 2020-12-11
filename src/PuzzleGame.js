/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import Combination from './Combination';
import GameConfig from './GameConfig';
import Tiles from './Tiles';

class PuzzleGame extends Phaser.Scene {
    constructor() {
        super('puzzleGame');
        this.emojis;
        this.combination;
    }

    create() {
        let background = this.add.image(
            GameConfig.width / 2,
            GameConfig.height / 2,
            'background'
        );

        this.combination = new Combination();
        this.combination.align();
        
        this.emojis = new Tiles(this, this.combination);
        this.emojis.setUpInputListener();


        this.tweens.add({
            targets: background,
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });

        this.tweens.add({
            targets: this.emojis.getChildren(),
            alpha: { from: 0, to: 1 },
            duration: 1000,
        });
    }
}

export default PuzzleGame;
