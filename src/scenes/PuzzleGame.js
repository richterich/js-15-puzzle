/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Scene } from 'phaser';
import CameraScale from '../components/CameraScale';
import Time from '../components/Time';
import Moves from '../components/Moves';
import BestMoves from '../components/BestMoves';
import ChangeOnHover from '../components/ChangeOnHover';
import Puzzle from '../components/Puzzle';
import PointerInput from '../components/PointerInput';

class PuzzleGame extends Scene {
    constructor () {
        super('game');
    }

    create () {
        // gameLayer
        const gameLayer = this.add.layer();

        // playTime
        const playTimeLabel = this.add.text(32, 60, '00:00', {
            fontFamily: 'FreeSans',
            fontSize: '96px',
        });
        playTimeLabel.setColor('#774936');
        gameLayer.add(playTimeLabel);

        // currentMoves
        const playMovesBg = this.add.image(386, 172, 'moves');
        playMovesBg.setOrigin(0, 0);
        gameLayer.add(playMovesBg);

        const playMovesLabel = this.add.text(423, 186, 'CURRENT', {
            fontFamily: 'FreeSans',
            fontSize: '16px',
            fontStyle: 'bold'
        });
        playMovesLabel.setColor('#a2f7fc');
        gameLayer.add(playMovesLabel);

        const currentMoves = this.add.text(460, 236, '0', {
            fontFamily: 'FreeSans',
            fontSize: '60px',
        });
        currentMoves.setColor('#ffffff');
        currentMoves.setOrigin(0.5, 0.5);
        gameLayer.add(currentMoves);

        // bestMoves
        const bestMovesBg = this.add.image(542, 172, 'moves');
        bestMovesBg.setOrigin(0, 0);
        gameLayer.add(bestMovesBg);

        const bestMovesLabel = this.add.text(595, 186, 'BEST', {
            fontFamily: 'FreeSans',
            fontSize: '16px',
            fontStyle: 'bold'
        });
        bestMovesLabel.setColor('#a2f7fc');
        gameLayer.add(bestMovesLabel);

        const currentBestMoves = this.add.text(615, 236, '0', {
            fontFamily: 'FreeSans',
            fontSize: '60px',
        });
        currentBestMoves.setColor('#ffffff');
        currentBestMoves.setOrigin(0.5, 0.5);
        gameLayer.add(currentBestMoves);

        // newGame
        const newGameBg = this.add.image(32, 186, 'outNewGame');
        newGameBg.setOrigin(0, 0);
        gameLayer.add(newGameBg);

        const newGameLabel = this.add.text(68, 216, 'New Game', {
            fontFamily: 'FreeSans',
            fontSize: '22px',
        });
        newGameLabel.setColor('#ffffff');
        gameLayer.add(newGameLabel);

        // boardFrame
        const boardFrame = this.add.image(32, 312, 'boardFrame');
        boardFrame.setOrigin(0, 0);
        gameLayer.add(boardFrame);

        // puzzleContainer
        const puzzleContainer = this.add.container(41.5, 321.5);
        gameLayer.add(puzzleContainer);

        // cameraScale (component)
        const cameraScale = new CameraScale(gameLayer);
        cameraScale.gameWidth = 720;
        cameraScale.gameHeight = 1280;

        // playTime (component)
        const playTime = new Time(playTimeLabel);
        playTime.delay = 1000;
        playTime.tweenDuration = 150;
        playTime.onTileMoved = 'tile-was-moved';
        playTime.onPuzzleSolved = 'puzzle-was-solved';
        playTime.onNewGame = 'new-game';

        // playMoves (component)
        const playMoves = new Moves(currentMoves);
        playMoves.tweenDuration = 150;
        playMoves.onTileMoved = 'tile-was-moved';
        playMoves.onPuzzleSolved = 'puzzle-was-solved';
        playMoves.onNewGame = 'new-game';

        // playMoves (component)
        const bestMoves = new BestMoves(currentBestMoves);
        bestMoves.tweenDuration = 150;
        bestMoves.onPuzzleSolved = 'puzzle-was-solved';
        bestMoves.onNewGame = 'new-game';

        // newGameButton (component)
        const newGameButton = new ChangeOnHover(newGameBg);
        newGameButton.eventName = 'new-game';
        newGameButton.overTexture = 'overNewGame';
        newGameButton.outTexture = 'outNewGame';
        newGameButton.downTexture = 'downNewGame';

        // puzzle (component)
        const puzzle = new Puzzle(puzzleContainer);
        puzzle.gridWidth = 4;
        puzzle.gridHeight = 4;
        puzzle.cellWidth = 159.48;
        puzzle.cellHeight = 159.405;
        puzzle.onTileMoved = 'tile-was-moved';
        puzzle.onPuzzleSolved = 'puzzle-was-solved';
        puzzle.onTileMoving = 'tile-is-moving';
        puzzle.onTileLock = 'tile-isnt-moving';
        puzzle.onTileMove = 'on-tile-move';
        puzzle.onNewGame = 'new-game';

        // pointerInput (component)
        const pointerInput = new PointerInput(puzzleContainer)
        pointerInput.gridWidth = 4
        pointerInput.gridHeight = 4
        pointerInput.onTileMove = 'on-tile-move'

        this.events.emit('scene-awake');
    }
}

export default PuzzleGame;
