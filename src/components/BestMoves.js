/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects, Tweens, Scenes } from 'phaser';
import Component from './Component';
import { PlayMoves } from '../plugins/PlayMoves';
import { ScoreStorage } from '../plugins/ScoreStorage';

class BestMoves extends Component {
  /**
   * 
   * @param {GameObjects.Text} gameObject 
   */
  constructor (gameObject) {
    super(gameObject);
    this.gameObject = gameObject;
    gameObject.__BestMoves = this;
  }

  /** @returns {BestMoves} */
  static getComponent (gameObject) {
    return gameObject.__BestMoves;
  }

  /** @type {GameObjects.Text} */
  gameObject;
  /** @type {number} */
  tweenDuration = 0;
  /** @type {string} */
  onPuzzleSolved = 'event-name';
  /** @type {string} */
  onNewGame = 'event-name';
  /** @type {Tweens.Tween} */
  #pushTween;
  /** @type {PlayMoves} */
  #playmoves;
  /** @type {ScoreStorage} */
  #scorestorage;

  #updateMoves () {
    this.#scorestorage.tryUpdate(this.#playmoves.moves);
  }

  #updateText () {
    this.gameObject.text = this.#scorestorage.bestScoreString;
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
    this.#scorestorage = this.scene.scorestorage;
  }

  start () {
    this.scene.events.on(this.onPuzzleSolved, this.#updateMoves, this);
    this.scene.events.on(this.onNewGame, this.#updateText, this);
    this.scene.events.once(Scenes.Events.PRE_UPDATE, this.#updateText, this);
  }

  destroy () {
    this.scene.events.off(this.onPuzzleSolved, this.#updateMoves, this);
    this.scene.events.off(this.onNewGame, this.#updateText, this);
    this.scene.events.off(Scenes.Events.PRE_UPDATE, this.#updateText, this);
  }
}

export default BestMoves;
