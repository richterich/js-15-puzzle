/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Structs, Scale, GameObjects, Cameras } from 'phaser'
import Component from './Component'

const { ceil, max } = Math

class CameraScale extends Component {
  /**
   * @param {GameObjects.Layer} gameObject The entity.
   */
  constructor (gameObject) {
    super(gameObject)
    this.gameObject = gameObject
    gameObject.__CameraScale = this
  }

  /** @returns {CameraScale} */
  static getComponent (gameObject) {
    return gameObject.__CameraScale
  }

  /** @type {GameObjects.Layer} */
  gameObject
  /** @type {number} */
  gameWidth = 0
  /** @type {number} */
  gameHeight = 0
  /** @type {Structs.Size} */
  sizer
  /** @type {Structs.Size} */
  parent
  /** @type {Cameras.Scene2D.Camera} */
  #mainCamera

  #resize (gameSize) {
    const { height, width } = gameSize

    this.parent.setSize(width, height)
    this.sizer.setSize(width, height)

    this.#updateCamera(this.#mainCamera)
  }

  #updateCamera (camera) {
    const x = ceil((this.parent.width - this.sizer.width) * 0.5)
    const y = ceil((this.parent.height - this.sizer.height) * 0.5)
    const scaleX = this.sizer.width / this.gameWidth
    const scaleY = this.sizer.height / this.gameHeight
    const zoom = max(scaleX, scaleY)

    camera.setViewport(x, y, this.sizer.width, this.sizer.height)
    camera.setZoom(zoom)
    camera.centerOn(this.gameWidth / 2, this.gameHeight / 2)
  }

  awake () {
    const { height, width } = this.scene.scale.gameSize

    this.parent = new Structs.Size(width, height)
    this.sizer = new Structs.Size(
      this.gameWidth,
      this.gameHeight,
      Structs.Size.FIT,
      this.parent
    )

    this.parent.setSize(width, height)
    this.sizer.setSize(width, height)

    this.#mainCamera = this.scene.cameras.main
  }

  start () {
    this.scene.scale.on(Scale.Events.RESIZE, this.#resize, this)
    this.#updateCamera(this.#mainCamera)
  }

  destroy () {
    this.scene.scale.off(Scale.Events.RESIZE, this.#resize, this)
  }
}

export default CameraScale
