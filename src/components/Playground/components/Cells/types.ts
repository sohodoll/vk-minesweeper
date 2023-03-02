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
  bomb,
}

export enum CellState {
  default,
  open,
  flagged,
}

export type CellType = {
  value: CellValue;
  state: CellState;
};
