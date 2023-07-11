/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects } from 'phaser';
import Component from './Component';

class AutoEvent extends Component {
  /**
   * 
   * @param {GameObjects.Layer} gameObject 
   */
  constructor (gameObject) {
    super(gameObject);
    this.gameObject = gameObject;
    gameObject.__AutoEvent = this;
  }

  /** @returns {Popup} */
  static getComponent (gameObject) {
    return gameObject.__AutoEvent;
  }

  /** @type {GameObjects.Layer} */
  gameObject;
  /** @type {number} */
  delay = 0;
  /** @type {string} */
  eventName = 'event-name';
  /** @type {Time.TimerEvent} */
  #timer;

  awake () {
    this.#timer = this.scene.time.addEvent({
      delay: this.delay,
      callback: () => {
        this.scene.events.emit(this.eventName);
      },
      loop: false,
      paused: true,
    });
  }

  start () {
    this.#timer.paused = false
  }
}

export default AutoEvent;
