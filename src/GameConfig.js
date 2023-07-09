/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import PuzzleGame from './scenes/PuzzleGame';
import BootGame from './scenes/BootGame';
import PreloadAssets from './scenes/PreloadAssets';

const GameConfig = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-area',
        width: 720,
        height: 1280,
    },
    pixelArt: false,
    scene: [BootGame, PreloadAssets, PuzzleGame],
    title: 'Fifteen Puzzle',
    url: 'https://fifteen-puzzle.richterich.dev',
    version: GAME_VERSION,
    banner: true,
    backgroundColor: '#f8edeb'
};

export default GameConfig;
