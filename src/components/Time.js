/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects } from 'phaser';
import Component from './Component'
import PlayTime from '../plugins/PlayTime';

class Time extends Component {
  /**
   * 
   * @param {GameObjects.Text} gameObject
   */
  constructor (gameObject) {
    super(gameObject)
    this.gameObject = gameObject
    gameObject.__Time = this
  }

  /** @returns {Time} */
  static getComponent (gameObject) {
    return gameObject.__Time
  }

  /** @type {GameObjects.Text} */
  gameObject;
  /** @type {number} */
  delay = 0;
  /** @type {number} */
  tweenDuration = 0;
  /** @type {string} */
  onTileMoved = 'event-name';
  /** @type {string} */
  onPuzzleSolved = 'event-name';
  /** @type {string} */
  onNewGame = 'event-name';
  /** @type {boolean} */
  #wasNotMoved = false;
  /** @type {Time.TimerEvent} */
  #timer;
  /** @type {PlayTime} */
  #playtime;

  #stopTime () {
    this.#timer.paused = true;
  }

  #startTime () {
    if (this.#wasNotMoved) {
      this.#timer.paused = false;
      this.#wasNotMoved = false;
    }
  }

  #resetTime () {
    this.#timer.paused = true;
    this.#wasNotMoved = true;
    this.#playtime.reset();
    this.gameObject.text = this.#playtime.timeString();
  }

  #updateTime () {
    this.#playtime.tick();
    this.gameObject.text = this.#playtime.timeString();
  }

  awake () {
    this.#timer = this.scene.time.addEvent({
      delay: this.delay,
      callback: this.#updateTime,
      callbackScope: this,
      loop: true,
      paused: true
    });
    this.#playtime = this.scene.playtime;
  }

  start () {
    this.scene.events.on(this.onTileMoved, this.#startTime, this);
    this.scene.events.on(this.onPuzzleSolved, this.#stopTime, this);
    this.scene.events.on(this.onNewGame, this.#resetTime, this);
  }

  destroy () {
    this.scene.events.off(this.onTileMoved, this.#startTime, this);
    this.scene.events.off(this.onPuzzleSolved, this.#stopTime, this);
    this.scene.events.off(this.onNewGame, this.#resetTime, this);
  }
}

export default Time;
