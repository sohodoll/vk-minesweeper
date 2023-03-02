import { CellValue, CellState, CellType } from './types';

export const Cells = (): Array<Array<CellType>> => {
  const cellsArray: Array<Array<CellType>> = [];

  for (let i = 0; i < 16; i++) {
    cellsArray.push([]);

    for (let j = 0; j < 16; j++) {
      cellsArray[i].push({
        value: CellValue.neutral,
        state: CellState.open,
      });
    }
  }

  let minesSet = 0;

  while (minesSet < 40) {
    const randomRow = Math.floor(Math.random() * 16);
    const randomColumn = Math.floor(Math.random() * 16);
    const currentCell = cellsArray[randomRow][randomColumn];

    if (currentCell.value !== CellValue.mine) {
      cellsArray[randomRow][randomColumn] = {
        ...cellsArray[randomRow][randomColumn],
        value: CellValue.mine,
      };
      minesSet++;
    }
  }

  for (let rowIndex = 0; rowIndex < 16; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 16; columnIndex++) {
      const currentCell = cellsArray[rowIndex][columnIndex];

      if (currentCell.value !== CellValue.mine) {
        let adjacentMines = 0;

        const topLeftMine =
          rowIndex > 0 && columnIndex > 0
            ? cellsArray[rowIndex - 1][columnIndex - 1]
            : null;

        const topMine =
          rowIndex > 0 ? cellsArray[rowIndex - 1][columnIndex] : null;

        const topRightMine =
          rowIndex > 0 && columnIndex < 15
            ? cellsArray[rowIndex - 1][columnIndex + 1]
            : null;

        const leftMine =
          columnIndex > 0 ? cellsArray[rowIndex][columnIndex - 1] : null;

        const rightMine =
          columnIndex < 15 ? cellsArray[rowIndex][columnIndex + 1] : null;

        const bottomLeftMine =
          rowIndex < 15 && columnIndex > 0
            ? cellsArray[rowIndex + 1][columnIndex - 1]
            : null;
        const bottomMine =
          rowIndex < 15 ? cellsArray[rowIndex + 1][columnIndex] : null;
        const bottomRightMine =
          rowIndex < 15 && columnIndex < 15
            ? cellsArray[rowIndex + 1][columnIndex + 1]
            : null;

        if (topLeftMine?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (topMine?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (topRightMine?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (leftMine?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (rightMine?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (bottomLeftMine?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (bottomMine?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (bottomRightMine?.value === CellValue.mine) {
          adjacentMines++;
        }

        if (adjacentMines > 0) {
          cellsArray[rowIndex][columnIndex] = {
            ...currentCell,
            value: adjacentMines,
          };
        }
      }
    }
  }

  return cellsArray;
};
