/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import BootGame from './scenes/BootGame';
import PreloadAssets from './scenes/PreloadAssets';
import PuzzleGame from './scenes/PuzzleGame';
import Congratulation from './scenes/Congratulation';
import { PlayTime } from './plugins/PlayTime';
import { PlayMoves } from './plugins/PlayMoves';
import { Puzzle } from './plugins/Puzzle';
import { UI } from './plugins/UI';
import { ScoreStorage } from './plugins/ScoreStorage';

const GameConfig = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-area',
        width: 720,
        height: 1280,
    },
    plugins: {
        global: [
            {
                plugin: PlayTime,
                key: 'playtime',
                start: true,
                mapping: 'playtime'
            },
            {
                plugin: PlayMoves,
                key: 'playmoves',
                start: true,
                mapping: 'playmoves'
            },
            {
                plugin: Puzzle,
                key: 'puzzle',
                start: true,
                mapping: 'puzzle'
            },
            {
                plugin: UI,
                key: 'ui',
                start: true,
                mapping: 'ui',
            },
            {
                plugin: ScoreStorage,
                key: 'scorestorage',
                start: true,
                mapping: 'scorestorage',
            }
        ]
    },
    pixelArt: false,
    scene: [
        BootGame,
        PreloadAssets,
        PuzzleGame,
        Congratulation,
    ],
    title: 'Fifteen Puzzle',
    url: 'https://fifteen-puzzle.richterich.dev',
    version: GAME_VERSION,
    banner: true,
    backgroundColor: '#f8edeb'
};

export default GameConfig;
