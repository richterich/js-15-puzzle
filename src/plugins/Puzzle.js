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
}

export { Puzzle };
