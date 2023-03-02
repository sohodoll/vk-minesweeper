import {
  DefaultCell,
  ClickedCell,
  MineCell,
  FlaggedCell,
} from 'components/CellSprites';
import { useState } from 'react';
import { CellState, CellValue } from '../types';
import { CellProps } from './types';

const renderCellByState = (state: number) => {
  if (state === CellState.default) {
    return DefaultCell();
  }
  if (state === CellState.open) {
    return ClickedCell();
  }
  if (state === CellState.flagged) {
    return FlaggedCell();
  }

  return null;
};

const renderCellByValue = (value: number) => {
  if (value === CellValue.mine) {
    return MineCell();
  }

  return null;
};

export function Cell({ col, row, state, value }: CellProps) {
  const [cellState, setCellState] = useState(state);
  const [cellValue, setCellValue] = useState(value);

  const handleCellMouseDown = () => {
    if (value === CellValue.mine) {
      setCellState(CellState.open);
      setCellValue(CellValue.mine);
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
      {state === CellState.open && value !== CellValue.mine
        ? renderCellByState(cellState)
        : renderCellByValue(cellValue)}
    </div>
  );
}
