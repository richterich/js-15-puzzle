/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Component from './Component';
import { Input, GameObjects } from '../phaser';

export default class KeyboardInput extends Component {
  constructor (gameObject) {
    super(gameObject);
    this.gameObject = gameObject;
    gameObject.__KeyboardInput = this;
  }

  /** @returns {KeyboardInput} */
  static getComponent (gameObject) {
    return gameObject.__KeyboardInput;
  }

  /** @type {GameObjects.Container} */
  gameObject;
  /** @type {string} */
  onTileMove = 'event-name';
  /** @type {Input.Keyboard.KeyboardPlugin} */
  #keyboard;
  /** @type {} */
  #emptyIndex;
  /** @type {} */
  #gridPosition;

  direction (keyCode) {
    const direction = { x: 0, y: 0 };
    switch (keyCode) {
      case Input.Keyboard.KeyCodes.UP:
      case Input.Keyboard.KeyCodes.W:
        direction.x = 0;
        direction.y = -1;
        break
      case Input.Keyboard.KeyCodes.LEFT:
      case Input.Keyboard.KeyCodes.A:
        direction.x = -1;
        direction.y = 0;
        break
      case Input.Keyboard.KeyCodes.DOWN:
      case Input.Keyboard.KeyCodes.S:
        direction.x = 0;
        direction.y = 1;
        break
      case Input.Keyboard.KeyCodes.RIGHT:
      case Input.Keyboard.KeyCodes.D:
        direction.x = 1;
        direction.y = 0;
        break
      default:
        break
    }
    return direction;
  }

  #onKeyDown (event) {
    // Find move direction
    const direction = this.direction(event.keyCode);
    // Find gap in the combination
    const gapIndex = this.#emptyIndex();
    const gapPosition = this.#gridPosition(gapIndex);
    // Find hit position on the puzzle
    const hitPosition = { x: 0, y: 0 };
    hitPosition.x = gapPosition.x - direction.x;
    hitPosition.y = gapPosition.y - direction.y;
    // Rise event
    this.scene.events.emit(this.onTileMove, direction, hitPosition, gapIndex);
  }

  awake () {
    // Create keyboard interaction
    this.#keyboard = this.scene.input.keyboard;
    // Cache the function references
    this.#emptyIndex = this.scene.combination.emptyIndex;
    this.#gridPosition = this.scene.combination.gridPosition;
  }

  start () {
    this.#keyboard.on(Input.Keyboard.Events.ANY_KEY_DOWN, this.#onKeyDown, this);
  }

  destroy () {
    this.#keyboard.off(Input.Keyboard.Events.ANY_KEY_DOWN, this.#onKeyDown, this);
  }
}
