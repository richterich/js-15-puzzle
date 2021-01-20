/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import GameConfig from './GameConfig';
import applyBackground from './ApplyBackground';

window.addEventListener('load', () => {
    bootGame();
    let refresh = document.getElementById('refresh');
    refresh.addEventListener('click', applyBackground);
});

function bootGame() {
    applyBackground()
        .then(() => {
            new Phaser.Game(GameConfig);
        })
        .catch((err) => {
            new Phaser.Game(GameConfig);
            throw err;
        });
}
