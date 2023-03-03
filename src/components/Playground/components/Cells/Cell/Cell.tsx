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
import { useState } from 'react';
import { CellState, CellValue } from '../types';
import { CellProps } from './types';

const renderCellByStateAndValue = (state: number, value: number) => {
  if (state === CellState.default) {
    return DefaultCell();
  }
  if (state === CellState.open) {
    if (value === CellValue.one) {
      return OneMine();
    }
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

  const handleCellMouseDown = () => {
    if (value === CellValue.mine) {
      setCellState(CellState.open);
      setCellValue(value);
    } else {
      setCellState(CellState.open);
    }
  };

  // const handleCellMouseUpLeave = () => {
  //   setCellState(CellState.default);
  // };

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseDown={handleCellMouseDown}
      // onMouseUp={handleCellMouseUpLeave}
    >
      {renderCellByStateAndValue(cellState, cellValue)}
    </div>
  );
}

// state !== CellState.open
//         ? // value !== CellValue.mine &&
//           // value !== CellValue.one &&
//           // value !== CellValue.two &&
//           // value !== CellValue.three &&
//           // value !== CellValue.four &&
//           // value !== CellValue.five &&
//           // value !== CellValue.six &&
//           // value !== CellValue.seven &&
//           // value !== CellValue.eight
//           renderCellByState(cellState)
//         : renderCellByValue(cellValue)
