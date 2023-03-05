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
  redMine,
}

export enum CellState {
  default,
  pending,
  open,
  flagged,
  questioned,
}

export type CellType = {
  value: CellValue;
  state: CellState;
};