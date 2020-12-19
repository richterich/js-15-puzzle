/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import PuzzleGame from './PuzzleGame';
import BootGame from './BootGame';

const GameConfig = {
    type: Phaser.CANVAS,
    parent: 'game-area',
    width: 800,
    height: 600,
    pixelArt: false,
    scene: [BootGame, PuzzleGame],
    title: 'Fifteen Puzzle',
    url: 'https://fifteen-puzzle.richterich.dev',
    version: '0.1.0',
    banner: true,
    transparent: true
};

export default GameConfig;
