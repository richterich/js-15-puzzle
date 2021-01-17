/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import GameConfig from './GameConfig';

import logoTexture from './assets/images/logo.png';
import buttonOverTexture from './assets/images/button-over.png';
import buttonOutTexture from './assets/images/button-out.png';
import buttonDownTexture from './assets/images/button-down.png';
import tilesFrameTexture from './assets/images/tiles-frame.png';
import panelFrameTexture from './assets/images/panel-frame.png';
import movesTexture from './assets/images/moves.png';
import emojisTexture from './assets/atlases/tiles.png';
import emojisAtlasData from './assets/atlases/tiles.json';

class BootGame extends Phaser.Scene {
    constructor() {
        super('bootGame');
    }

    preload() {
        this.load.image('logo', logoTexture);
        this.load.image('overNewGame', buttonOverTexture);
        this.load.image('outNewGame', buttonOutTexture);
        this.load.image('downNewGame', buttonDownTexture);
        this.load.image('tilesFrame', tilesFrameTexture);
        this.load.image('panelFrame', panelFrameTexture);
        this.load.image('moves', movesTexture);
        this.load.atlas('tiles', emojisTexture, emojisAtlasData);
    }

    create() {
        let logo = this.add.image(GameConfig.width / 2, GameConfig.height / 2, 'logo');

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
