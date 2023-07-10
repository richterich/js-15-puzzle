/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Geom, Input, GameObjects } from 'phaser';
import Component from './Component';
import { Puzzle as PuzzlePlugin } from '../plugins/Puzzle';

const { ceil } = Math;

export default class PointerInput extends Component {
  /**
   * 
   * @param {GameObjects.Container} gameObject 
   */
  constructor (gameObject) {
    super(gameObject);
    this.gameObject = gameObject;
    gameObject.__PointerInput = this;
  }

  /** @returns {PointerInput} */
  static getComponent (gameObject) {
    return gameObject.__PointerInput;
  }

  /** @type {GameObjects.Container} */
  gameObject;
  /** @type {number} */
  gridWidth = 0;
  /** @type {number} */
  gridHeight = 0;
  /** @type {string} */
  onTileMove = 'event-name';
  /** @type {PuzzlePlugin} */
  #puzzle;

  #onPuzzleDown (_pointer, localX, localY, _event) {
    // Find hit position on the puzzle
    const { width, height } = this.gameObject.getBounds();
    const hitPosition = { x: 0, y: 0 };
    hitPosition.x = ceil(localX / (width / this.gridWidth));
    hitPosition.y = ceil(localY / (height / this.gridHeight));
    // Find gap in the combination
    const gapIndex = this.#puzzle.gapIndex();
    const gapPosition = this.#puzzle.gridPosition(gapIndex);
    // Find move direction
    const direction = { x: 0, y: 0 };
    direction.x = gapPosition.x - hitPosition.x;
    direction.y = gapPosition.y - hitPosition.y;
    // Rise event
    this.scene.events.emit(this.onTileMove, direction, hitPosition, gapIndex);
  }

  awake () {
    // Create pointer interaction
    const { width, height } = this.gameObject.getBounds();
    const hitArea = new Geom.Rectangle(0, 0, width, height);
    this.gameObject.setInteractive(hitArea, Geom.Rectangle.Contains);
    this.#puzzle = this.scene.puzzle;
  }

  start () {
    this.gameObject.on(Input.Events.POINTER_DOWN, this.#onPuzzleDown, this);
  }

  destroy () {
    this.gameObject.removeInteractive()
    this.gameObject.off(Input.Events.POINTER_DOWN, this.#onPuzzleDown, this);
  }
}
