/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects, Tweens } from 'phaser';
import Component from './Component';

class Popup extends Component {
  /**
   * 
   * @param {GameObjects.Container} gameObject 
   */
  constructor (gameObject) {
    super(gameObject)
    this.gameObject = gameObject
    gameObject.__Popup = this
  }

  /** @returns {Popup} */
  static getComponent (gameObject) {
    return gameObject.__Popup
  }

  /** @type {GameObjects.Container} */
  gameObject
  /** @type {number} */
  tweenDuration = 0
  /** @type {string} */
  onPopupClose = 'event-name'
  /** @type {string} */
  onPopupOpen = 'event-name'
  /** @type {string} */
  onPopupClosed = 'event-name'
  /** @type {string} */
  onPopupOpened = 'event-name'
  /** @type {Tweens.Tween} */
  #scaleUp
  /** @type {Tweens.Tween} */
  #scaleDown

  #openPopup () {
    this.#scaleUp.play()
  }

  #closePopup () {
    this.#scaleDown.play()
  }

  awake () {
    this.#scaleUp = this.scene.tweens.add({
      targets: this.gameObject,
      scale: { from: 0.8, to: 1 },
      duration: this.tweenDuration,
      paused: true,
      onComplete: () => {
        this.scene.events.emit(this.onPopupOpened)
      },
      onStart: () => {
        this.gameObject.scale = 0.8
        this.gameObject.setVisible(true)
      },
    })
    this.#scaleDown = this.scene.tweens.add({
      targets: this.gameObject,
      scale: { from: 1, to: 0.8 },
      duration: this.tweenDuration,
      paused: true,
      onComplete: () => {
        this.scene.events.emit(this.onPopupClosed)
      },
    })
    this.gameObject.setVisible(false);
  }

  start () {
    this.scene.events.once(this.onPopupClose, this.#closePopup, this);
    this.scene.events.once(this.onPopupOpen, this.#openPopup, this);
  }

  destroy () {
    this.scene.events.off(this.onPopupClose, this.#closePopup, this);
    this.scene.events.off(this.onPopupOpen, this.#openPopup, this);
  }
}

export default Popup;
