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

  return cellsArray;
};
