/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Scene } from 'phaser';

import WebFontUrl from '../assets/fonts/FreeSans.otf'
import logoTexture from '../assets/images/logo.png';
import buttonOverTexture from '../assets/images/button-over.png';
import buttonOutTexture from '../assets/images/button-out.png';
import buttonDownTexture from '../assets/images/button-down.png';
import boardFrameTexture from '../assets/images/board.png';
import congratulationTexture from '../assets/images/congratulation.png';
import movesTexture from '../assets/images/moves.png';
import tilesTexture from '../assets/atlases/tiles.png';
import tilesAtlasData from '../assets/atlases/tiles.json';

class BootGame extends Scene {
    constructor () {
        super('bootGame');
    }

    init () {
        // Inject CSS Font
        const element = document.createElement('style')
        document.head.appendChild(element)
        const sheet = element.sheet
        const styles = `@font-face { font-family: "FreeSans"; src: url("${WebFontUrl}") format("opentype"); }\n`
        sheet.insertRule(styles, 0)
    }

    preload () {
        this.load.script(
            'webfont',
            'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
        )
        this.load.image('logo', logoTexture);
        this.load.image('overNewGame', buttonOverTexture);
        this.load.image('outNewGame', buttonOutTexture);
        this.load.image('downNewGame', buttonDownTexture);
        this.load.image('boardFrame', boardFrameTexture);
        this.load.image('congratulation', congratulationTexture);
        this.load.image('moves', movesTexture);
        this.load.atlas('tiles', tilesTexture, tilesAtlasData);
    }

    create () {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        const logo = this.add.image(width / 2, height / 2, 'logo');

        this.tweens.add({
            targets: logo,
            alpha: { from: 0, to: 1 },
            duration: 500,
            onComplete: () => {
                this.tweens.add({
                    targets: logo,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => {
                        this.loadGame();
                    },
                });
            },
        });
    }

    loadGame () {
        this.scene.start('puzzleGame');
    }
}

export default BootGame;