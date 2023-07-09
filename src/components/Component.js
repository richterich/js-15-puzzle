import Phaser from 'phaser';

class Component {
  /**
   * @param {Phaser.GameObjects.GameObject} gameObject The entity.
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
      this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
    }

    if (listenUpdate) {
      this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    if (listenStart || listenUpdate || listenDestroy) {
      gameObject.on(Phaser.GameObjects.Events.DESTROY, () => {
        this.scene.events.off(Scenes.Events.UPDATE, this.start, this);
        this.scene.events.off(Scenes.Events.UPDATE, this.update, this);

        if (listenDestroy) {
          this.destroy();
        }
      })
    }
  }

  /** @type {Phaser.Scene} */
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
