/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Scenes, GameObjects, Types } from 'phaser'
import Component from './Component'

class Puzzle extends Component {
  constructor (gameObject) {
    super(gameObject)
    this.gameObject = gameObject
    gameObject.__Puzzle = this
  }

  /** @returns {Puzzle} */
  static getComponent (gameObject) {
    return gameObject.__Puzzle
  }

  /** @type {GameObjects.Container} */
  gameObject
  /** @type {number} */
  gridWidth = 0
  /** @type {number} */
  gridHeight = 0
  /** @type {number} */
  cellWidth = 0
  /** @type {number} */
  cellHeight = 0
  /** @type {string} */
  onTileMoved = 'event-name'
  /** @type {string} */
  onPuzzleSolved = 'event-name'
  /** @type {string} */
  onTileMoving = 'event-name'
  /** @type {string} */
  onTileLock = 'event-name'
  /** @type {string} */
  onTileMove = 'event-name'
  /** @type {string} */
  onUpdateTileFrame = 'event-name'
  /** @type {string} */
  onNewGame = 'event-name'
  /** @type {boolean} */
  #noMoving = true
  /** @type {boolean} */
  #notSolved = true
  /** @type {Array} */
  #tweens = []
  /** @type {Types.Tweens.TimelineBuilderConfig} */
  #appearanceConfig = {
    duration: 420,
    ease: 'Power1',
    paused: true,
    tweens: this.#tweens
  }
  /** @type {} */
  #combination;
  /** @type {} */
  #playItems;

  #boardPosition (tileIndex) {
    const col = tileIndex % this.gridWidth
    const row = Math.floor(tileIndex / this.gridHeight)

    const x = this.cellWidth * col + this.cellWidth * 0.5
    const y = this.cellHeight * row + this.cellHeight * 0.5

    return { x, y }
  }

  #updateTiles (values) {
    for (let i = 0, j = 0; i < values.length; ++i) {
      const position = this.#boardPosition(i)
      if (values[i] !== 0) {
        const tile = this.gameObject.list[j]
        tile.setPosition(position.x, position.y)
        tile.setTile(
          this.#playItems.usedItem,
          values[i].toString(),
          this.#playItems.color
        )
        tile.setNumberVisible(false)
        ++j
      }
    }
  }

  #updateTileFrames () {
    this.gameObject.iterate((tile) => {
      tile.updateFrame(this.#playItems.usedItem, this.#playItems.color)
    })
  }

  #newGame () {
    this.#combination.align()
    this.#combination.shuffle()
    if (!this.#combination.isSolvable()) {
      this.#combination.rotateLeft()
    }
    this.#updateTiles(this.#combination.values)
    this.gameObject.iterate((tile) => tile.setAlpha(0))
    const appearance = this.scene.tweens.timeline(this.#appearanceConfig)
    appearance.play()
    this.#notSolved = true
  }

  #inBoard (hitPosition) {
    const inWidth = hitPosition.x > 0 && this.gridWidth >= hitPosition.x
    const inHeight = hitPosition.y > 0 && this.gridHeight >= hitPosition.y
    return inWidth && inHeight
  }

  #isApproved (direction) {
    if (direction.x === 0 && direction.y === 1) return true
    if (direction.x === 0 && direction.y === -1) return true
    if (direction.x === 1 && direction.y === 0) return true
    if (direction.x === -1 && direction.y === 0) return true
    return false
  }

  #tryMove (direction, hitPosition, gapIndex) {
    let wasMove = false
    if (
      this.#noMoving &&
      this.#isApproved(direction) &&
      this.#inBoard(hitPosition)
    ) {
      this.#noMoving = false
      // Update combination
      const tileIndex = this.#combination.arrayIndex(hitPosition)
      const tileNumber = this.#combination.values[tileIndex].toString()
      this.#combination.swapTiles(tileIndex, gapIndex)
      // Update puzzle
      const tile = this.gameObject.list.find(
        (t) => tileNumber === t.number.text
      )
      const targetPosition = { x: 0, y: 0 }
      targetPosition.x = this.cellWidth * direction.x + tile.x
      targetPosition.y = this.cellHeight * direction.y + tile.y
      this.scene.tweens.add({
        targets: tile,
        x: targetPosition.x,
        y: targetPosition.y,
        duration: 80,
        onComplete: () => {
          this.#noMoving = true
          const eventName = this.#notSolved
            ? this.onTileMoved
            : this.onPuzzleSolved
          this.scene.events.emit(eventName)
        }
      })
      wasMove = true
    }
    return wasMove
  }

  #moveTile (direction, hitPosition, gapIndex) {
    if (this.#notSolved) {
      const wasMove = this.#tryMove(direction, hitPosition, gapIndex)
      if (wasMove) {
        this.#notSolved = this.#combination.solved() === false
      }
      const eventName = wasMove ? this.onTileMoving : this.onTileLock
      this.scene.events.emit(eventName)
    }
  }

  awake () {
    // Create a puzzle
    const length = this.gridWidth * this.gridHeight - 1;
    for (let i = 0; i < length; ++i) {
      const position = this.#boardPosition(i);
      const tile = TilePrefab.make(this.scene, position.x, position.y);
      tile.setAlpha(0);
      this.gameObject.add(tile);
      // Create an appearance animation of the puzzle
      this.#tweens.push({
        targets: tile,
        alpha: { from: 0, to: 1 },
        scale: { from: 0, to: 1 },
        offset: i * 30,
        onStart: () => tile.setNumberVisible(true),
      });
    }
  }

  start () {
    this.scene.events.on(this.onTileMove, this.#moveTile, this);
    this.scene.events.on(this.onNewGame, this.#newGame, this);
    this.scene.events.on(this.onUpdateTileFrame, this.#updateTileFrames, this);
    this.scene.events.once(Scenes.Events.PRE_UPDATE, this.#newGame, this);
  }

  destroy () {
    this.scene.events.off(this.onTileMove, this.#moveTile, this);
    this.scene.events.off(this.onNewGame, this.#newGame, this);
    this.scene.events.off(this.onUpdateTileFrame, this.#updateTileFrames, this);
    this.scene.events.off(Scenes.Events.PRE_UPDATE, this.#newGame, this);
  }

}

export default Puzzle;
