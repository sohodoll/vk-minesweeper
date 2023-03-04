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
  if (state === CellState.default) {
    return DefaultCell();
  }

  if (state === CellState.flagged) {
    return FlaggedCell();
  }

  if (state === CellState.questioned) {
    return QuestionCell();
  }

  if (state === CellState.pending) {
    return ClickedCell();
  }

  if (state === CellState.open) {
    if (value === CellValue.one) {
      return OneMine();
    }
    if (value === CellValue.two) {
      return TwoMines();
    }
    if (value === CellValue.three) {
      return ThreeMines();
    }
    if (value === CellValue.four) {
      return FourMines();
    }
    if (value === CellValue.five) {
      return FiveMines();
    }
    if (value === CellValue.six) {
      return SixMines();
    }
    if (value === CellValue.seven) {
      return SevenMines();
    }
    if (value === CellValue.eight) {
      return EightMines();
    }
    if (value === CellValue.mine) {
      return MineCell();
    }

    if (value === CellValue.redMine) {
      return RedMineCell();
    }

    return ClickedCell();
  }

  return null;
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
