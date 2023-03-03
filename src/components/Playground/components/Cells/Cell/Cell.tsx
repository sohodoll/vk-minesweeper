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
} from 'components/CellSprites';
import { MouseEvent, useState } from 'react';
import { CellState, CellValue } from '../types';
import { CellProps } from './types';

const renderCellByStateAndValue = (state: number, value: number) => {
  if (state === CellState.default) {
    return DefaultCell();
  }

  if (state === CellState.flagged) {
    return FlaggedCell();
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

    return ClickedCell();
  }
  if (state === CellState.flagged) {
    return FlaggedCell();
  }

  return null;
};

export function Cell({ col, row, state, value }: CellProps) {
  const [cellState, setCellState] = useState(state);
  const [cellValue, setCellValue] = useState(value);

  const handleCellMouseDown = (e: MouseEvent) => {
    if (e.button === 0) {
      setCellState(CellState.open);
      setCellValue(value);

      sessionStorage.setItem('game', 'true');
    }
  };

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    if (cellState !== CellState.open) {
      if (cellState === CellState.default) {
        setCellState(CellState.flagged);
        return;
      }
      setCellState(CellState.default);
    }
  };

  return (
    <div
      id="cell"
      role="button"
      tabIndex={0}
      onMouseDown={handleCellMouseDown}
      onContextMenu={handleRightClick}
    >
      {renderCellByStateAndValue(cellState, cellValue)}
    </div>
  );
}
