/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects, Tweens } from 'phaser';
import Component from './Component';

class Moves extends Component {
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
  /** @type {} */
  #playMoves;

  #updateMoves () {
    this.#playMoves.increase();
    this.gameObject.text = this.#playMoves.movesString();
  }

  #resetMoves () {
    this.#playMoves.reset();
    this.gameObject.text = this.#playMoves.movesString();
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
    })
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
