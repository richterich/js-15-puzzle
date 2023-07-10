/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Plugins } from 'phaser';
import Combination from '../Combination';

const PUZZLE_INITIALIZED = 'puzzle:initialized';
const PLUGIN_PUZZLE_START = 'puzzle-plugin:start';
const PLUGIN_PUZZLE_STOP = 'puzzle-plugin:stop';

class Puzzle extends Plugins.BasePlugin {
  /** @type {Combination} */
  #combination = null

  /** @returns {number[]} */
  get combination () {
    return [...this.#combination.values]
  }

  init () {
    this.#combination = new Combination()
    this.game.events.emit(PUZZLE_INITIALIZED, this);
  }

  start () {
    this.game.events.emit(PLUGIN_PUZZLE_START, this);
  }

  stop () {
    this.game.events.emit(PLUGIN_PUZZLE_STOP, this);
  }

  /**
   * @returns {void}
   */
  generate () {
    this.#combination.align()
    this.#combination.shuffle()
    if (!this.#combination.isSolvable()) {
      this.#combination.rotateLeft()
    }
  }

  /**
   * 
   * @param {{x:number, y:number}} hit - Position of pointer hit
   * @returns {number}
   */
  tileIndex (hit) {
    return this.#combination.arrayIndex(hit)
  }

  /**
   * 
   * @param {number} index - Index of a tile
   * @returns {string}
   */
  tileNumber (index) {
    return `${this.#combination.values[index]}`
  }

  /**
   * 
   * @param {number} tileIndex 
   * @param {number} gapIndex 
   * @returns {void}
   */
  move (tileIndex, gapIndex) {
    this.#combination.swapTiles(tileIndex, gapIndex)
  }

  /**
   * @method solved - checks if the combination is solved.
   * @returns {boolean} True if the combination is solved, otherwise - False.
   */
  solved () {
    const lastValueZero = this.#combination.values.at(-1) === 0
    const noInversions = this.#combination.inversions() === 0
    return lastValueZero && noInversions
  }

  /**
   * 
   * @returns {number}
   */
  gapIndex () {
    return this.#combination.emptyIndex()
  }

  /**
   * 
   * @param {number} index - Index of gap
   * @returns {{x:number, y:number}}
   */
  gridPosition (index) {
    return this.#combination.gridPosition(index)
  }
}

export { Puzzle };
