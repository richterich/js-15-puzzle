/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Plugins } from 'phaser';

const PLAYTIME_INITIALIZED = 'playtime:initialized';
const PLUGIN_PLAYTIME_START = 'playtime-plugin:start';
const PLUGIN_PLAYTIME_STOP = 'playtime-plugin:stop';

class PlayTime extends Plugins.BasePlugin {
  /** @type {number} */
  #time = 0;

  init () {
    this.game.events.emit(PLAYTIME_INITIALIZED, this);
  }

  start () {
    this.game.events.emit(PLUGIN_PLAYTIME_START, this);
  }

  stop () {
    this.game.events.emit(PLUGIN_PLAYTIME_STOP, this);
  }

  reset () {
    this.#time = 0;
  }

  tick () {
    ++this.#time;
  }

  timeString () {
    const seconds = this.#time % 60;
    const minutes = ~~(this.#time / 60);
    const currentSeconds = seconds > 59 ? '00' : seconds.toString().padStart(2, '0');
    const currentMinutes = minutes > 99 ? '99' : minutes.toString().padStart(2, '0');
    return `${currentMinutes}:${currentSeconds}`;
  }
}

export { PlayTime };
