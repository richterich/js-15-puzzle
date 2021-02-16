/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import GameConfig from './GameConfig';

window.addEventListener('load', () => {
    bootGame();
});

function bootGame() {
    new Phaser.Game(GameConfig);
}
