/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import GameConfig from './GameConfig';

import logoTexture from './assets/images/logo.png';
import backgroundTexture from './assets/images/background.png';
import emojisTexture from './assets/atlases/tiles.png';
import atariFontTexture from './assets/fonts/bitmap/atari-classic.png';

import emojisAtlasData from './assets/atlases/tiles.json';
import atariFontData from './assets/fonts/bitmap/atari-classic.xml';

class BootGame extends Phaser.Scene {
    constructor() {
        super('bootGame');
    }

    preload() {
        this.load.bitmapFont('atari', atariFontTexture, atariFontData);

        this.load.image('logo', logoTexture);
        this.load.image('background', backgroundTexture);

        this.load.atlas('tiles', emojisTexture, emojisAtlasData);
    }

    create() {
        let GameVersionStr = `version: ${GameConfig.version}`;
        
        this.add.bitmapText(10, 580, 'atari', GameVersionStr).setScale(0.2);

        let logo = this.add.image(GameConfig.width / 2, GameConfig.height / 2, 'logo');

        this.tweens.add({
            targets: logo,
            alpha: { from: 0, to: 1 },
            duration: 1000,
            onComplete: () => {
                this.tweens.add({
                    targets: logo,
                    alpha: { from: 1, to: 0 },
                    duration: 1000,
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
