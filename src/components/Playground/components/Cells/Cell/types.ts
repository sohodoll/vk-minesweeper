import { CellState, CellValue } from '../types';

export type CellProps = {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
};
