import { CellState, CellValue } from '../../types';

export type CellProps = {
  row: number;
  col: number;
  onClick(rowParam: number, colParam: number): (...args: unknown[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseDown(rowParam: number, colParam: number): (...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseUpLeave(rowParam: number, colParam: number): (...args: any[]) => void;
  state: CellState;
  value: CellValue;
};
