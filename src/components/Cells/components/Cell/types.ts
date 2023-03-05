import { CellState, CellValue } from '../../types';

export type CellProps = {
  row: number;
  col: number;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  onMouseDown(rowParam: number, colParam: number): (...args: any[]) => void;
  onMouseUpLeave(rowParam: number, colParam: number): (...args: any[]) => void;
  state: CellState;
  value: CellValue;
};
