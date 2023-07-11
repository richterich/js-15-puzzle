/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Plugins } from 'phaser';

const PLAYMOVES_INITIALIZED = 'playmoves:initialized';
const PLUGIN_PLAYMOVES_START = 'playmoves-plugin:start';
const PLUGIN_PLAYMOVES_STOP = 'playmoves-plugin:stop';

class PlayMoves extends Plugins.BasePlugin {
  /** @type {number} */
  #moves = 0;

  get moves () {
    return this.#moves;
  }

  get movesString () {
    return `${this.#moves}`;
  }

  init () {
    this.game.events.emit(PLAYMOVES_INITIALIZED, this);
  }

  start () {
    this.game.events.emit(PLUGIN_PLAYMOVES_START, this);
  }

  stop () {
    this.game.events.emit(PLUGIN_PLAYMOVES_STOP, this);
  }

  reset () {
    this.#moves = 0;
  }

  increase () {
    ++this.#moves;
  }
}

export { PlayMoves };
