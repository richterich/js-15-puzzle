/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Scene } from 'phaser';

import FontUrl from '../../static/fonts/FreeSans.otf';
import AssetPackUrl from '../../static/assets/preload-asset-pack.json';

class BootGame extends Scene {
    constructor () {
        super('boot');
    }

    init () {
        // Inject CSS font
        const element = document.createElement('style');
        document.head.appendChild(element);
        const sheet = element.sheet;
        const styles = `@font-face { font-family: "FreeSans"; src: url("${FontUrl}") format("opentype"); }\n`;
        sheet.insertRule(styles, 0);
    }

    preload () {
        this.load.script(
            'webfont',
            'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
        );
        this.load.pack('preload-asset', AssetPackUrl);
    }

    create () {
        const { width, height } = this.scale.gameSize;
        const logo = this.add.image(width / 2, height / 2, 'logo');

        this.tweens.add({
            targets: logo,
            alpha: { from: 0, to: 1 },
            duration: 500,
            onComplete: () => {
                WebFont.load({
                    custom: {
                        families: ['FreeSans']
                    },
                    active: () => {
                        this.tweens.add({
                            targets: logo,
                            alpha: { from: 1, to: 0 },
                            duration: 500,
                            onComplete: () => {
                                this.scene.start('preload');
                            },
                        });
                    }
                })
            },
        });
    }
}

export default BootGame;
