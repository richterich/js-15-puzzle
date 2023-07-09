/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Scenes, GameObjects, Scene } from 'phaser';

class Component {
  /**
   * @param {GameObjects.GameObject} gameObject The entity.
   */
  constructor (gameObject) {
    this.scene = gameObject.scene;

    const listenAwake = this.awake !== Component.prototype.awake;
    const listenStart = this.start !== Component.prototype.start;
    const listenUpdate = this.update !== Component.prototype.update;
    const listenDestroy = this.destroy !== Component.prototype.destroy;

    if (listenAwake) {
      this.scene.events.once('scene-awake', this.awake, this);
    }

    if (listenStart) {
      this.scene.events.once(Scenes.Events.UPDATE, this.start, this);
    }

    if (listenUpdate) {
      this.scene.events.on(Scenes.Events.UPDATE, this.update, this);
    }

    if (listenStart || listenUpdate || listenDestroy) {
      gameObject.on(GameObjects.Events.DESTROY, () => {
        this.scene.events.off(Scenes.Events.UPDATE, this.start, this);
        this.scene.events.off(Scenes.Events.UPDATE, this.update, this);

        if (listenDestroy) {
          this.destroy();
        }
      })
    }
  }

  /** @type {Scene} */
  scene;

  awake () {
    // override this
  }

  start () {
    // override this
  }

  update () {
    // override this
  }

  destroy () {
    // override this
  }
}

export default Component
