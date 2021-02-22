/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @class ScoreStorage
 */
class PlayTime {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.label = undefined;
        this.time = 0;
        this.timer = undefined;
    }

    createPlayTime() {
        this.label = this.scene.add.text(this.x, this.y, '', {
            fontFamily: 'FreeSans',
            fontSize: '96px',
            fontStyle: 'bold',
        });
        this.label.setColor('#774936');
    }

    startTime() {
        if (undefined === this.timer) {
            this.timer = this.scene.time.addEvent({
                delay: 1000,
                callback: this.increaseTime,
                callbackScope: this,
                loop: true,
            });
        } else {
            this.timer.paused = false;
        }
        
    }

    stopTime() {
        if (undefined !== this.timer) {
            this.timer.paused = true;
        }
    }

    resetTime() {
        this.time = 0;
    }

    increaseTime() {
        this.time++;
    }

    updateTime() {
        const seconds = this.time % 60;
        const minutes = Math.floor(this.time / 60);
        const currentSeconds = seconds >= 60 ? '00' : seconds.toString().padStart(2, '0');
        const currentMinutes = minutes >= 99 ? '99' : minutes.toString().padStart(2, '0');
        this.label.text = `${currentMinutes}:${currentSeconds}`;
    }
}

export default PlayTime;
