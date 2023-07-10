/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects, Tweens } from 'phaser';
import Component from './Component';
import PlayMoves from '../plugins/PlayMoves';

class Moves extends Component {
  /**
   * 
   * @param {GameObjects.Text} gameObject 
   */
  constructor (gameObject) {
    super(gameObject);
    this.gameObject = gameObject;
    gameObject.__Moves = this;
  }

  /** @returns {Moves} */
  static getComponent (gameObject) {
    return gameObject.__Moves;
  }

  /** @type {GameObjects.Text} */
  gameObject;
  /** @type {number} */
  tweenDuration = 0;
  /** @type {string} */
  onTileMoved = 'event-name';
  /** @type {string} */
  onPuzzleSolved = 'event-name';
  /** @type {string} */
  onNewGame = 'event-name';
  /** @type {Tweens.Tween} */
  #pushTween;
  /** @type {PlayMoves} */
  #playmoves;

  #updateMoves () {
    this.#playmoves.increase();
    this.gameObject.text = this.#playmoves.movesString();
  }

  #resetMoves () {
    this.#playmoves.reset();
    this.gameObject.text = this.#playmoves.movesString();
    this.#pushTween.play();
  }

  awake () {
    this.#pushTween = this.scene.tweens.add({
      targets: this.gameObject,
      scaleX: '*=0.8',
      scaleY: '*=0.8',
      duration: this.tweenDuration,
      yoyo: true,
      paused: true,
      persist: true,
    })
    this.#playmoves = this.scene.playmoves;
  }

  start () {
    this.scene.events.on(this.onTileMoved, this.#updateMoves, this);
    this.scene.events.on(this.onPuzzleSolved, this.#updateMoves, this);
    this.scene.events.on(this.onNewGame, this.#resetMoves, this);
  }

  destroy () {
    this.scene.events.off(this.onTileMoved, this.#updateMoves, this);
    this.scene.events.off(this.onPuzzleSolved, this.#updateMoves, this);
    this.scene.events.off(this.onNewGame, this.#resetMoves, this);
  }
}

export default Moves;
