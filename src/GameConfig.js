/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import PuzzleGame from './scenes/PuzzleGame';
import BootGame from './scenes/BootGame';

const GameConfig = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-area',
        width: 640,
        height: 960
    },
    pixelArt: false,
    scene: [BootGame, PuzzleGame],
    title: 'Fifteen Puzzle',
    url: 'https://fifteen-puzzle.richterich.dev',
    version: '0.1.0',
    banner: true,
    backgroundColor: '#f8edeb'
};

export default GameConfig;
