/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Plugins } from 'phaser';

const SCORESTORAGE_INITIALIZED = 'scorestorage:initialized';
const PLUGIN_SCORESTORAGE_START = 'scorestorage-plugin:start';
const PLUGIN_SCORESTORAGE_STOP = 'scorestorage-plugin:stop';

const BEST_SCORE = 'best_score';

class ScoreStorage extends Plugins.BasePlugin {
    /** @returns {string} */
    get bestScoreString () {
        const existingScore = localStorage.getItem(BEST_SCORE) || '0';
        return existingScore;
    }

    /** @returns {number} */
    get bestScore () {
        const existingScore = +(localStorage.getItem(BEST_SCORE) || 0);
        return existingScore;
    }

    init () {
        this.game.events.emit(SCORESTORAGE_INITIALIZED, this);
    }

    start () {
        this.game.events.emit(PLUGIN_SCORESTORAGE_START, this);
    }

    stop () {
        this.game.events.emit(PLUGIN_SCORESTORAGE_STOP, this);
    }

    /**
     * 
     * @param {number} currentScore 
     * @returns {boolean}
     */
    tryUpdate (currentScore) {
        if (0 < currentScore) {
            const existingScore = +(localStorage.getItem(BEST_SCORE) || Number.MAX_SAFE_INTEGER);
            const bestScore = Math.min(currentScore, existingScore);
            localStorage.setItem(BEST_SCORE, bestScore);
            return bestScore < existingScore;
        }
        return false
    }
}

export { ScoreStorage };
