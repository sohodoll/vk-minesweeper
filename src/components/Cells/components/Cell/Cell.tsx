import {
  DefaultCell,
  ClickedCell,
  MineCell,
  FlaggedCell,
  OneMine,
  TwoMines,
  ThreeMines,
  FourMines,
  FiveMines,
  SixMines,
  SevenMines,
  EightMines,
  RedMineCell,
  QuestionCell,
} from 'components/CellSprites';
import { CellState, CellValue } from '../../types';
import { CellProps } from './types';

const renderCellByStateAndValue = (state: number, value: number) => {
  switch (state) {
    case CellState.default:
      return DefaultCell();
    case CellState.flagged:
      return FlaggedCell();
    case CellState.questioned:
      return QuestionCell();
    case CellState.pending:
      return ClickedCell();
    case CellState.open:
      switch (value) {
        case CellValue.one:
          return OneMine();
        case CellValue.two:
          return TwoMines();
        case CellValue.three:
          return ThreeMines();
        case CellValue.four:
          return FourMines();
        case CellValue.five:
          return FiveMines();
        case CellValue.six:
          return SixMines();
        case CellValue.seven:
          return SevenMines();
        case CellValue.eight:
          return EightMines();
        case CellValue.mine:
          return MineCell();
        case CellValue.redMine:
          return RedMineCell();
        default:
          return ClickedCell();
      }
    default:
      return null;
  }
};

export function Cell({
  col,
  row,
  state,
  value,
  onClick,
  onContext,
  onMouseDown,
  onMouseUpLeave,
}: CellProps) {
  return (
    <div
      id="cell"
      role="button"
      onClick={onClick(row, col)}
      tabIndex={0}
      onContextMenu={onContext(row, col)}
      onMouseDown={onMouseDown(row, col)}
      onMouseUp={onMouseUpLeave(row, col)}
      onMouseLeave={onMouseUpLeave(row, col)}
    >
      {renderCellByStateAndValue(state, value)}
    </div>
  );
}
