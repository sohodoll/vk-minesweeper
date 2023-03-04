import { useState, useEffect, MouseEvent } from 'react';
import { CountDisplay } from 'components/Header/components/CountDisplay';
import { Cell, Cells } from 'components/Playground/components/Cells';
import {
  CellState,
  CellType,
  CellValue,
} from 'components/Playground/components/Cells/types';
import { Face } from 'components/Header/components/Face';
import { handleNeutralCells } from './helpers/handleNeutralCells';

export function Game() {
  const [faceState, setFaceState] = useState('default');
  const [time, setTime] = useState(0);
  const [cells, setCells] = useState(Cells());
  const [game, setGame] = useState<boolean>(false);
  const [minesCount, setMinesCount] = useState<number>(40);
  const [hasLost, setHasLost] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const revealMines = (row: number, col: number): Array<Array<CellType>> => {
    const currentCells = cells.slice();

    return currentCells.map((rowArr) =>
      rowArr.map((cell) => {
        if (cell.value === CellValue.mine) {
          return {
            ...cell,
            state: CellState.open,
          };
        }
        return cell;
      })
    );
  };

  useEffect(() => {
    const handleMouseDown = (): void => {
      if (!hasLost) {
        setFaceState('cellPressed');
      }
    };

    const handleMouseUp = (): void => {
      if (!hasLost) {
        setFaceState('default');
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [hasLost]);

  useEffect(() => {
    if (game && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [game, time]);

  const handleFaceClick = (): void => {
    setGame(false);
    setTime(0);
    setCells(Cells());
    setMinesCount(40);
    setHasLost(false);
    setHasWon(false);
  };

  const handleFaceMouseDown = () => {
    setFaceState('clicked');
  };

  const handleFaceMouseUpLeave = () => {
    setFaceState('default');
  };

  const handleCellClick = (row: number, col: number) => (): void => {
    if (!hasLost) {
      let newCells = cells.slice();

      if (!game) {
        if (newCells[row][col].value === CellValue.mine) {
          let isCellMine = true;

          while (isCellMine) {
            newCells = Cells();

            if (newCells[row][col].value !== CellValue.mine) {
              isCellMine = false;
              break;
            }
          }
        }

        setCells(newCells);
        setGame(true);
      }

      const currentCell = newCells[row][col];

      if (
        currentCell.state === CellState.flagged ||
        currentCell.state === CellState.open
      ) {
        return;
      }

      if (currentCell.value === CellValue.mine) {
        setHasLost(true);
        newCells[row][col].value = CellValue.redMine;
        newCells[row][col].state = CellState.open;

        newCells = revealMines(row, col);
        setCells(newCells);
      } else if (currentCell.value === CellValue.neutral) {
        newCells = handleNeutralCells(newCells, row, col);
      } else {
        newCells[row][col].state = CellState.open;
        setCells(newCells);
      }

      let areSafeCellsLeft = false;

      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
          const thisCurrentCell = newCells[i][j];

          if (
            thisCurrentCell.value !== CellValue.mine &&
            thisCurrentCell.state === CellState.default
          ) {
            areSafeCellsLeft = true;
            break;
          }
        }
      }

      if (!areSafeCellsLeft) {
        newCells = newCells.map((thisRow) =>
          thisRow.map((cell) => {
            if (cell.value === CellValue.mine) {
              return {
                ...cell,
                state: CellState.flagged,
              };
            }
            return cell;
          })
        );
        setHasWon(true);
      }

      setCells(newCells);
    }
  };

  useEffect(() => {
    if (hasLost) {
      setFaceState('lost');
      setGame(false);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setGame(false);
      setFaceState('won');
    }
  }, [hasWon]);

  const handleCellMouseDown =
    (row: number, col: number) =>
    (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();
      if (!hasLost) {
        const currentCells = cells.slice();
        const currentCell = cells[row][col];

        if (currentCell.state === CellState.default && e.button === 0) {
          currentCells[row][col].state = CellState.pending;
        }
      }
    };

  const handleCellMouseUpLeave =
    (row: number, col: number) =>
    (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      const currentCells = cells.slice();
      const currentCell = cells[row][col];

      if (currentCell.state === CellState.pending && e.button === 0) {
        currentCells[row][col].state = CellState.default;
      }
    };

  const handleCellContext =
    (row: number, col: number) =>
    (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      const currentCells = cells.slice();

      const currentCell = cells[row][col];

      if (!game || currentCell.state === CellState.open) {
        return;
      }

      if (currentCell.state === CellState.default) {
        if (minesCount > 0) {
          currentCells[row][col].state = CellState.flagged;

          setCells(currentCells);

          setMinesCount(minesCount - 1);
        }
      } else if (currentCell.state === CellState.flagged) {
        currentCells[row][col].state = CellState.default;

        setCells(currentCells);

        setMinesCount(minesCount + 1);
      }
    };

  const renderCells = () => {
    return cells.map((arr, i) =>
      arr.map((cell, j) => {
        return (
          <Cell
            onClick={handleCellClick}
            onContext={handleCellContext}
            onMouseDown={handleCellMouseDown}
            onMouseUpLeave={handleCellMouseUpLeave}
            key={i + j}
            state={cell.state}
            value={cell.value}
            row={i}
            col={j}
          />
        );
      })
    );
  };

  return (
    <>
      <div
        id="Header"
        className="w-full h-12 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white flex justify-around items-center"
      >
        <CountDisplay value={String(minesCount)} />
        <div
          onMouseDown={handleFaceMouseDown}
          onMouseUp={handleFaceMouseUpLeave}
          onMouseLeave={handleFaceMouseUpLeave}
          onClick={handleFaceClick}
          role="button"
          tabIndex={0}
        >
          <Face state={faceState} />
        </div>

        <CountDisplay value={String(time)} />
      </div>
      <div
        role="button"
        tabIndex={0}
        id="playground"
        className="h-full w-full border-black border-2 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white grid grid-rows-16 grid-cols-16"
      >
        {renderCells()}
      </div>
    </>
  );
}
