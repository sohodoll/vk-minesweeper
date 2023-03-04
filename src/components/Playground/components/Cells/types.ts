export enum CellValue {
  neutral,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  mine,
}

export enum CellState {
  default,
  pending,
  open,
  flagged,
}

export type CellType = {
  value: CellValue;
  state: CellState;
};
