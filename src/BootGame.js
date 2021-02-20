/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';

import logoTexture from './assets/images/logo.png';
import buttonOverTexture from './assets/images/button-over.png';
import buttonOutTexture from './assets/images/button-out.png';
import buttonDownTexture from './assets/images/button-down.png';
import boardFrameTexture from './assets/images/board.png';
import movesTexture from './assets/images/moves.png';
import tilesTexture from './assets/atlases/tiles.png';
import tilesAtlasData from './assets/atlases/tiles.json';

class BootGame extends Phaser.Scene {
    constructor() {
        super('bootGame');
    }

    preload() {
        this.load.image('logo', logoTexture);
        this.load.image('overNewGame', buttonOverTexture);
        this.load.image('outNewGame', buttonOutTexture);
        this.load.image('downNewGame', buttonDownTexture);
        this.load.image('boardFrame', boardFrameTexture);
        this.load.image('moves', movesTexture);
        this.load.atlas('tiles', tilesTexture, tilesAtlasData);
    }

    create() {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        const logo = this.add.image(width / 2, height / 2, 'logo');

        this.tweens.add({
            targets: logo,
            alpha: {from: 0, to: 1},
            duration: 500,
            onComplete: () => {
                this.tweens.add({
                    targets: logo,
                    alpha: {from: 1, to: 0},
                    duration: 500,
                    onComplete: () => {
                        this.loadGame();
                    },
                });
            },
        });
    }

    loadGame() {
        this.scene.start('puzzleGame');
    }
}

export default BootGame;
