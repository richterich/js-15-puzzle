/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects } from 'phaser'
import Component from './Component'

class PuzzleBoard extends Component {
  constructor (gameObject) {
    super(gameObject)
    this.gameObject = gameObject
    gameObject.__PuzzleBoard = this
  }

  /** @returns {PuzzleBoard} */
  static getComponent (gameObject) {
    return gameObject.__PuzzleBoard
  }

  /** @type {GameObjects.Container} */
  gameObject
  /** @type {{key:string,frame?:string|number}} */
  boardTexture = { key: 'atlas-name', frame: 'default-frame-name' }
  /** @type {number} */
  gridWidth = 0
  /** @type {number} */
  gridHeight = 0
  /** @type {number} */
  cellWidth = 0
  /** @type {number} */
  cellHeight = 0

  awake () {
    const length = this.gridWidth * this.gridHeight
    for (let i = 0; i < length; ++i) {
      const currentWidth = i % this.gridWidth
      const currentHeight = Math.floor(i / this.gridHeight)

      const positionX = this.cellWidth * currentWidth
      const positionY = this.cellHeight * currentHeight

      const gridTile = this.scene.add.image(
        positionX,
        positionY,
        this.boardTexture.key,
        this.boardTexture.frame
      )
      gridTile.setOrigin(0)
      this.gameObject.add(gridTile)
    }
  }
}

export default PuzzleBoard;
