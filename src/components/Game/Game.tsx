import { useState, useEffect, MouseEvent } from 'react';
import { Cell, Cells } from 'components/Cells';
import { CellState, CellType, CellValue } from 'components/Cells/types';
import { COLS, ROWS } from 'variables/constants';
import { Face, CountDisplay } from './components';
import { handleNeutralCells } from './helpers';
import { FaceType } from './components/Face/types';

export function Game() {
  const [faceState, setFaceState] = useState(FaceType.default);
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

  // handle timer

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

  // handle face clicks and states

  const handleFaceClick = (): void => {
    setGame(false);
    setTime(0);
    setCells(Cells());
    setMinesCount(40);
    setHasLost(false);
    setHasWon(false);
  };

  const handleFaceMouseDown = () => {
    setFaceState(FaceType.pressed);
  };

  const handleFaceMouseUpLeave = () => {
    setFaceState(FaceType.default);
  };

  useEffect(() => {
    if (hasLost) {
      setFaceState(FaceType.lost);
      setGame(false);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setGame(false);
      setFaceState(FaceType.won);
    }
  }, [hasWon]);

  // handle cell clicks

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

      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
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

  const handleCellMouseDown =
    (row: number, col: number) =>
    (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();
      if (!hasLost) {
        const currentCells = cells.slice();
        const currentCell = cells[row][col];

        if (currentCell.state === CellState.default && e.button === 0) {
          currentCells[row][col].state = CellState.pending;
          setFaceState(FaceType.wowFace);
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
        setFaceState(FaceType.default);
      }
    };

  const handleCellRightClick =
    (row: number, col: number) =>
    (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      const currentCells = cells.slice();
      const currentCell = currentCells[row][col];

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
        currentCells[row][col].state = CellState.questioned;

        setCells(currentCells);

        setMinesCount(minesCount + 1);
      } else if (currentCell.state === CellState.questioned) {
        currentCells[row][col].state = CellState.default;

        setCells(currentCells);
      }
    };

  // handle cells rendering

  const renderCells = () => {
    return cells.map((arr, i) =>
      arr.map((cell, j) => {
        return (
          <Cell
            onClick={handleCellClick}
            onContext={handleCellRightClick}
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
