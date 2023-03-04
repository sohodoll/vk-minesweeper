import { useState, useEffect, MouseEvent } from 'react';
import { CountDisplay } from 'components/Header/components/CountDisplay';
import { Cell, Cells } from 'components/Playground/components/Cells';
import { CellState } from 'components/Playground/components/Cells/types';
import { Face } from 'components/Header/components/Face';

export function Game() {
  const [faceState, setFaceState] = useState('default');
  const [time, setTime] = useState(0);
  const [cells, setCells] = useState(Cells());
  const [game, setGame] = useState<boolean>(false);
  const [minesCount, setMinesCount] = useState<number>(40);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFaceState('cellPressed');
    };

    const handleMouseUp = (): void => {
      setFaceState('default');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
  };

  const handleCellClick = (row: number, column: number) => (): void => {
    setGame(true);
  };

  const handleCellMouseDown =
    (rowParam: number, colParam: number) =>
    (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      const currentCells = cells.slice();
      const currentCell = cells[rowParam][colParam];

      if (currentCell.state === CellState.default && e.button === 0) {
        currentCells[rowParam][colParam].state = CellState.pending;
      }
    };

  const handleCellMouseUpLeave =
    (rowParam: number, colParam: number) =>
    (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      const currentCells = cells.slice();
      const currentCell = cells[rowParam][colParam];

      if (currentCell.state === CellState.pending && e.button === 0) {
        currentCells[rowParam][colParam].state = CellState.default;
      }
    };

  const handleCellContext =
    (rowParam: number, colParam: number) =>
    (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      const currentCells = cells.slice();

      const currentCell = cells[rowParam][colParam];

      if (!game || currentCell.state === CellState.open) {
        return;
      }

      if (currentCell.state === CellState.default) {
        if (minesCount > 0) {
          currentCells[rowParam][colParam].state = CellState.flagged;

          setCells(currentCells);

          setMinesCount(minesCount - 1);
        }
      } else if (currentCell.state === CellState.flagged) {
        currentCells[rowParam][colParam].state = CellState.default;

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
        <div onClick={handleFaceClick} role="button" tabIndex={0}>
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