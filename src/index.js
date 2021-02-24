/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import '../styles/main.css';
import Phaser from 'phaser';
import GameConfig from './GameConfig';

window.addEventListener('load', () => {
    bootGame();
    const repoStars = document.getElementById('repo-stars');
    setInterval(() => {
        repoStars.classList.remove('rate');
        void repoStars.offsetWidth;
        repoStars.classList.add('rate');
    }, 90000);
});

function bootGame() {
    new Phaser.Game(GameConfig);
}
