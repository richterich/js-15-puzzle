/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects } from 'phaser'

class Tile extends GameObjects.Container {
  constructor (scene, x, y) {
    super(scene, x ?? 0, y ?? 0)

    // tile
    const tile = scene.add.image(0, 0, 'tiles', 'tile1')
    this.add(tile)

    // number
    const number = scene.add.text(0, -8, '', {})
    number.setOrigin(0.5, 0.5)
    // number.text = '1'
    number.setStyle({
      align: 'center',
      color: '#774936',
      fontFamily: 'FreeSans',
      fontSize: '64px'
    })
    this.add(number)

    this.tile = tile
    this.number = number
  }

  /** @returns {Tile} */
  static make (scene, x, y) {
    return new Tile(scene, x, y)
  }

  /** @type {GameObjects.Image} */
  tile
  /** @type {GameObjects.BitmapText} */
  number

  setTile (frameName, numberText, color = '#774936') {
    this.name = frameName
    this.tile.setFrame(frameName)
    this.number.text = numberText
    this.number.setStyle({ color })
  }

  updateFrame (frameName, color = '#774936') {
    this.name = frameName
    this.tile.setFrame(frameName)
    this.number.setStyle({ color })
  }

  setNumberVisible (visible) {
    this.number.setVisible(visible)
  }
}

export default Tile;
