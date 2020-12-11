/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Combination from '../src/Combination';

test('Instanced values length', () => {
    const expectedLength = 16;
    const combination = new Combination();
    expect(combination.values.length).toBe(expectedLength);
});

test('Number of invertions', () => {
    const combination = new Combination();
    combination.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    expect(combination.inversions()).toEqual(0);
    combination.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0];
    expect(combination.inversions()).toEqual(1);
    combination.values = [4, 3, 2, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    expect(combination.inversions()).toEqual(6);
});

test('Empty line number', () => {
    const combination = new Combination();
    combination.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    expect(combination.emptyLine()).toEqual(1);
    combination.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 12, 13, 14, 15];
    expect(combination.emptyLine()).toEqual(2);
    combination.values = [1, 2, 3, 4, 5, 6, 7, 0, 8, 9, 10, 11, 12, 13, 14, 15];
    expect(combination.emptyLine()).toEqual(3);
    combination.values = [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    expect(combination.emptyLine()).toEqual(4);
});

test('Align combination', () => {
    const expectedVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    const combination = new Combination();
    combination.align();
    expect(combination.values).toEqual(expectedVal);
});

test('Rotate combination to left', () => {
    const expectedVal = [13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3, 0, 12, 8, 4];
    const combination = new Combination();
    combination.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    combination.rotateLeft();
    expect(combination.values).toEqual(expectedVal);
});

test('Index position to Row and Col position', () => {
    const gridPositions = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
    ];
    const combination = new Combination();
    for (let i = 0; i < gridPositions.length; ++i) {
        expect(combination.gridPosition(i)).toEqual(gridPositions[i]);
    }
});

test('Row and Col position to index position', () => {
    const gridPositions = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
    ];
    const combination = new Combination();

    for (let i = 0; i < gridPositions.length; ++i) {
        expect(combination.arrayIndex(gridPositions[i])).toEqual(i);
    }
});

test('Swap two tiles (BROKEN COMBINATION!)', () => {
    const expectedVal = [
        undefined,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        0,
        1,
    ];
    const combination = new Combination();
    combination.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    combination.swapTiles(0, 16);
    expect(combination.values.length).toEqual(expectedVal.length);
    expect(combination.values).toEqual(expectedVal);
});
