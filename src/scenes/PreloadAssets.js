/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2023 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Scene, Scenes, Loader } from 'phaser';
import AssetPackUrl from '../../static/assets/asset-pack.json';

class PreloadAssets extends Scene {
  constructor () {
    super('preload');
  }

  create () {
    this.events.once(Scenes.Events.UPDATE, this.#startGame, this)
  }

  #startGame () {
    this.load.once(Loader.Events.COMPLETE, () => {
      this.time.addEvent({
        delay: 500,
        callback: () => {
          this.scene.start('game')
        },
        loop: false
      })
    })
    this.load.pack('game-asset', AssetPackUrl)
    this.load.start()
  }
}

export default PreloadAssets
