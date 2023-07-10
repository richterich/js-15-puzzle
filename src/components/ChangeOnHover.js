/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GameObjects, Input } from 'phaser';
import Component from './Component';

class ChangeOnHover extends Component {
  /**
   * 
   * @param {GameObjects.Image} gameObject 
   */
  constructor (gameObject) {
    super(gameObject);
    this.gameObject = gameObject;
    gameObject.__ChangeOnHover = this;
  }

  /** @returns {ChangeOnHover} */
  static getComponent (gameObject) {
    return gameObject.__ChangeOnHover;
  }

  /** @type {GameObjects.Image} */
  gameObject
  /** @type {string} */
  eventName = 'event-name'
  /** @type {string} */
  overTexture = 'texture-name';
  /** @type {string} */
  outTexture = 'texture-name';
  /** @type {string} */
  downTexture = 'texture-name';

  awake () {
    this.gameObject.setInteractive()
  }

  start () {
    this.gameObject.on(Input.Events.POINTER_OVER, () => {
      this.gameObject.setTexture(this.overTexture);
    });
    this.gameObject.on(Input.Events.POINTER_OUT, () => {
      this.gameObject.setTexture(this.outTexture);
    });
    this.gameObject.on(Input.Events.POINTER_DOWN, () => {
      this.gameObject.setTexture(this.downTexture);
    });
    this.gameObject.on(Input.Events.POINTER_UP, () => {
      this.gameObject.setTexture(this.overTexture);
      this.scene.events.emit(this.eventName);
    });
  }
}

export default ChangeOnHover;
