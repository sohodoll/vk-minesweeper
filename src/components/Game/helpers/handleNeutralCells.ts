import { CellState, CellType } from 'components/Cells/types';
import { CellValue } from '../../Cells/types';
import { getAdjacentCells } from './getAdjacentCells';

export const handleNeutralCells = (
  cells: Array<Array<CellType>>,
  row: number,
  col: number
): Array<Array<CellType>> => {
  const currentCell = cells[row][col];

  if (
    currentCell.state === CellState.open ||
    currentCell.state === CellState.flagged
  ) {
    return cells;
  }

  let newCells = cells.slice();
  newCells[row][col].state = CellState.open;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = getAdjacentCells(cells, row, col);

  if (
    topLeftCell?.state === CellState.default &&
    topLeftCell.value !== CellValue.mine
  ) {
    if (topLeftCell.value === CellValue.neutral) {
      newCells = handleNeutralCells(newCells, row - 1, col - 1);
    } else {
      newCells[row - 1][col - 1].state = CellState.open;
    }
  }

  if (
    topCell?.state === CellState.default &&
    topCell.value !== CellValue.mine
  ) {
    if (topCell.value === CellValue.neutral) {
      newCells = handleNeutralCells(newCells, row - 1, col);
    } else {
      newCells[row - 1][col].state = CellState.open;
    }
  }

  if (
    topRightCell?.state === CellState.default &&
    topRightCell.value !== CellValue.mine
  ) {
    if (topRightCell.value === CellValue.neutral) {
      newCells = handleNeutralCells(newCells, row - 1, col + 1);
    } else {
      newCells[row - 1][col + 1].state = CellState.open;
    }
  }

  if (
    leftCell?.state === CellState.default &&
    leftCell.value !== CellValue.mine
  ) {
    if (leftCell.value === CellValue.neutral) {
      newCells = handleNeutralCells(newCells, row, col - 1);
    } else {
      newCells[row][col - 1].state = CellState.open;
    }
  }

  if (
    rightCell?.state === CellState.default &&
    rightCell.value !== CellValue.mine
  ) {
    if (rightCell.value === CellValue.neutral) {
      newCells = handleNeutralCells(newCells, row, col + 1);
    } else {
      newCells[row][col + 1].state = CellState.open;
    }
  }

  if (
    bottomLeftCell?.state === CellState.default &&
    bottomLeftCell.value !== CellValue.mine
  ) {
    if (bottomLeftCell.value === CellValue.neutral) {
      newCells = handleNeutralCells(newCells, row + 1, col - 1);
    } else {
      newCells[row + 1][col - 1].state = CellState.open;
    }
  }

  if (
    bottomCell?.state === CellState.default &&
    bottomCell.value !== CellValue.mine
  ) {
    if (bottomCell.value === CellValue.neutral) {
      newCells = handleNeutralCells(newCells, row + 1, col);
    } else {
      newCells[row + 1][col].state = CellState.open;
    }
  }

  if (
    bottomRightCell?.state === CellState.default &&
    bottomRightCell.value !== CellValue.mine
  ) {
    if (bottomRightCell.value === CellValue.neutral) {
      newCells = handleNeutralCells(newCells, row + 1, col + 1);
    } else {
      newCells[row + 1][col + 1].state = CellState.open;
    }
  }

  return newCells;
};
