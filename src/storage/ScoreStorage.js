/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
const BEST = 'best_score';
/**
 * @class ScoreStorage
 */
class ScoreStorage {
    updateScore(amount) {
        localStorage.setItem(BEST, amount);
    }

    removeScore() {
        localStorage.removeItem(BEST);
    }

    get bestScore() {
        const score = localStorage.getItem(BEST);
        if (null === score) {
            return 0;
        }
        return score;
    }
}

export { ScoreStorage };
