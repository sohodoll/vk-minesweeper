import { getAdjacentCells } from '../../../Game/helpers/getAdjacentCells';
import { CellValue, CellState, CellType } from './types';

export const Cells = (): Array<Array<CellType>> => {
  const cellsArray: Array<Array<CellType>> = [];

  for (let i = 0; i < 16; i++) {
    cellsArray.push([]);

    for (let j = 0; j < 16; j++) {
      cellsArray[i].push({
        value: CellValue.neutral,
        state: CellState.default,
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

        const {
          topLeftCell,
          topCell,
          topRightCell,
          leftCell,
          rightCell,
          bottomLeftCell,
          bottomCell,
          bottomRightCell,
        } = getAdjacentCells(cellsArray, rowIndex, columnIndex);

        if (topLeftCell?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (topCell?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (topRightCell?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (leftCell?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (rightCell?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (bottomLeftCell?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (bottomCell?.value === CellValue.mine) {
          adjacentMines++;
        }
        if (bottomRightCell?.value === CellValue.mine) {
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

  console.log(cellsArray);

  return cellsArray;
};
