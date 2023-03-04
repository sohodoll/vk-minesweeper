import { CellState, CellType } from 'components/Cells/types';

export const getAdjacentCells = (
  cells: Array<Array<CellType>>,
  row: number,
  col: number
): {
  topLeftCell: CellType | null;
  topCell: CellType | null;
  topRightCell: CellType | null;
  leftCell: CellType | null;
  rightCell: CellType | null;
  bottomLeftCell: CellType | null;
  bottomCell: CellType | null;
  bottomRightCell: CellType | null;
} => {
  const topLeftCell = row > 0 && col > 0 ? cells[row - 1][col - 1] : null;
  const topCell = row > 0 ? cells[row - 1][col] : null;
  const topRightCell = row > 0 && col < 15 ? cells[row - 1][col + 1] : null;
  const leftCell = col > 0 ? cells[row][col - 1] : null;
  const rightCell = col < 15 ? cells[row][col + 1] : null;
  const bottomLeftCell = row < 15 && col > 0 ? cells[row + 1][col - 1] : null;
  const bottomCell = row < 15 ? cells[row + 1][col] : null;
  const bottomRightCell = row < 15 && col < 15 ? cells[row + 1][col + 1] : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};

// Array<Array<CellType>>
