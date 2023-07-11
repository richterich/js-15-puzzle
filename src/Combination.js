/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
const SIDE = 4; // Side of a board.
const LENGTH = SIDE * SIDE; // Size of array for a puzzle with 4x4 size.
/**
 * @class Combination that represents a combination of tiles
 * on a game board with 4x4 size.
 */
class Combination {
    /**
     * @constructs Combination that contains integer values of tiles.
     */
    constructor () {
        this.values = new Array(LENGTH);
    }
    /**
     * @method inversions - returns quantity of inversions for combination.
     * @summary There is a tile number with a number that greater than a current tile number.
     */
    inversions () {
        let numberOfInversions = 0;
        for (let i = 0; i < LENGTH; ++i) {
            if (0 !== this.values[i]) {
                for (let j = 0; j < i; ++j) {
                    if (this.values[j] > this.values[i]) {
                        ++numberOfInversions;
                    }
                }
            }
        }
        return numberOfInversions;
    }
    /**
     * @method emptyLine - finds the line number of the empty tile, starts from last row.
     * @returns { NUmber } - integer value that indicate row with empty tile.
     */
    emptyLine () {
        let lineNumber;
        for (let i = LENGTH - 1; i >= 0; --i) {
            if (0 === this.values[i]) {
                lineNumber = SIDE - Math.floor(i / SIDE);
                break;
            }
        }
        return lineNumber;
    }
    /**
     * @method align - align the combination from 1 to 15, last is zero.
     */
    align () {
        for (let i = 0; i < LENGTH - 1; i++) {
            this.values[i] = 1 + i;
        }
        this.values[LENGTH - 1] = 0;
    }
    /**
     * @method shuffle - shuffles the combination of the tiles.
     * @summary Shuffled combination can be unsolvable.
     */
    shuffle () {
        let randomIndex, tempValue;
        for (let i = 0; i < LENGTH; ++i) {
            randomIndex = Math.floor(Math.random() * LENGTH);
            tempValue = this.values[randomIndex];
            this.values[randomIndex] = this.values[i];
            this.values[i] = tempValue;
        }
    }
    /**
     * @method rotateLeft - rotates the combination of the tiles to left.
     * @summary After rotation there will be a combination in which the digits of the tiles appear
     * to be lying on their sides.
     */
    rotateLeft () {
        let rotatedValues = new Array(LENGTH);
        let index = 0;
        for (let i = 0; i < LENGTH; ++i) {
            index += SIDE;
            if (index > LENGTH) {
                index = (index % LENGTH) - 1;
            }
            rotatedValues[index - 1] = this.values[i];
        }
        for (let i = 0; i < LENGTH; ++i) {
            this.values[i] = rotatedValues[i];
        }
    }
    /**
     * @method gridPosition - gives the x and y position of a tile in the grid.
     * @param { Number } index - index of a tile.
     * @returns { Object } Row (x) and Column (y) of a tile in the game board.
     */
    gridPosition (index) {
        let y = Math.ceil((index + 1) / SIDE);
        let x = (index % SIDE) + 1;
        return { x, y };
    }
    /**
     * @method arrayIndex - gives index in the array of the tiles by its x and y position in the grid.
     * @param { Object } gridPosition Row (x) and Column (y) of a tile in the game board.
     * @returns { Number } index of a tile. From 0 to 15.
     */
    arrayIndex (gridPosition) {
        return SIDE * (gridPosition.y - 1) + (gridPosition.x - 1);
    }
    /**
     * @method swapTiles - swaps two tiles by their indexes.
     * @param { Number } fromIndex - an index of a tile wich will be swapping.
     * @param { Number } toIndex - an index of a tile wich will be swapped.
     * @summary The last will be placed to the place of the former.
     */
    swapTiles (fromIndex, toIndex) {
        let value = this.values[toIndex];
        this.values[toIndex] = this.values[fromIndex];
        this.values[fromIndex] = value;
    }
    /**
     * @method emptyIndex - gives index of the empty space in the array of the tiles.
     */
    emptyIndex () {
        const emptyElemet = (tile) => tile === 0;
        return this.values.findIndex(emptyElemet);
    }
    /**
     * @method isSolvable - Checks the combination for solvability.
     * @returns { Boolean } - True if combination can be solved, otherwise - False.
     */
    isSolvable () {
        const inversionsNumber = this.inversions();
        const emptyTileRow = this.emptyLine();
        if (0 !== emptyTileRow % 2) {
            return 0 === inversionsNumber % 2;
        } else {
            return 0 !== inversionsNumber % 2;
        }
    }
}

export default Combination;
