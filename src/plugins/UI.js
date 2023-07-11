/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Plugins, Scenes, Core } from 'phaser';

const UI_INITIALIZED = 'ui:initialized';
const PLUGIN_UI_START = 'ui-plugin:start';
const PLUGIN_UI_STOP = 'ui-plugin:stop';

class UI extends Plugins.BasePlugin {
  /** @type {Scenes.SceneManager} */
  #manager = null;

  init () {
    this.#manager = this.game.scene
    this.game.events.emit(UI_INITIALIZED, this);
  }

  start () {
    this.game.events.once(Core.Events.READY, this.#subscribeEvents, this);
    this.game.events.once(Core.Events.DESTROY, this.#unsubscribeEvents, this);
    this.game.events.emit(PLUGIN_UI_START, this);
  }

  stop () {
    this.game.events.off(Core.Events.READY, this.#subscribeEvents, this);
    this.game.events.off(Core.Events.DESTROY, this.#unsubscribeEvents, this);
    this.game.events.emit(PLUGIN_UI_STOP, this);
  }

  #subscribeEvents () {
    const gameplay = this.#manager.getScene('game');
    const congrats = this.#manager.getScene('congrats');

    gameplay.events.on('puzzle-was-solved', this.#launchCongrats, this);
    congrats.events.on('next-game', this.#nextGame, this);
  }

  #unsubscribeEvents () {
    const gameplay = this.#manager.getScene('game');
    const congrats = this.#manager.getScene('congrats');

    gameplay.events.off('puzzle-was-solved', this.#launchCongrats, this);
    congrats.events.off('next-game', this.#nextGame, this);
  }

  /** @returns {void} */
  #launchCongrats () {
    const gameplay = this.#manager.getScene('game');
    const congrats = this.#manager.getScene('congrats');
    gameplay.time.addEvent({
      delay: 600,
      repeat: 0,
      callback: () => {
        gameplay.events.once(
          Scenes.Events.PAUSE,
          () => {
            congrats.events.once(
              Scenes.Events.POST_UPDATE,
              () => {
                congrats.events.emit('open-popup');
              }
            );
            this.#manager.start('congrats');
          }
        );
        this.#manager.pause('game');
      }
    });
  }

  /** @returns {void} */
  #nextGame () {
    const gameplay = this.#manager.getScene('game');
    const congrats = this.#manager.getScene('congrats');
    congrats.events.once(
      'popup-closed',
      () => {
        congrats.events.once(
          Scenes.Events.SHUTDOWN,
          () => {
            this.#manager.resume('game');
          }
        );
        gameplay.events.once(
          Scenes.Events.RESUME,
          () => {
            gameplay.events.emit('new-game');
          }
        );
        this.#manager.stop('congrats');
      }
    );
    congrats.events.emit('close-popup');
  }
}

export { UI };
