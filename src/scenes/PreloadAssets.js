/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2023 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Scene, Scenes, Loader } from 'phaser';
import CameraScale from '../components/CameraScale';

import AssetPackUrl from '../../static/assets/asset-pack.json';

class PreloadAssets extends Scene {
  constructor () {
    super('preload');
  }

  create () {
    // layer
    const layer = this.add.layer();

    // logo
    const logo = this.add.image(360, 640, 'logo');
    layer.add(logo);

    // cameraScale (component)
    const cameraScale = new CameraScale(layer);
    cameraScale.gameWidth = 720;
    cameraScale.gameHeight = 1280;

    this.events.emit('scene-awake');
    this.events.once(Scenes.Events.UPDATE, this.#load, this);
  }

  #load () {
    this.load.once(Loader.Events.COMPLETE, () => {
      this.time.addEvent({
        delay: 500,
        callback: () => {
          this.scene.start('game')
        },
        loop: false
      })
    });
    this.load.pack('game-asset', AssetPackUrl);
    this.load.start();
  }
}

export default PreloadAssets
