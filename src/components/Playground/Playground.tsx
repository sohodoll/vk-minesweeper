import { DefaultCell } from 'components/CellSprites';
import { useState } from 'react';
import { Cell, Cells } from './components/Cells';

export function Playground() {
  const [cells, setCells] = useState(Cells());

  const renderCells = () => {
    return cells.map((arr, i) =>
      arr.map((cell, j) => {
        return <Cell key={i + j} />;
      })
    );
  };

  return (
    <div className="h-full w-full border-black border-2 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white grid grid-rows-16 grid-cols-16">
      {renderCells()}
    </div>
  );
}
