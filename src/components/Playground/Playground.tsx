// /* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useState, useEffect } from 'react';
// import { Cell, Cells } from './components/Cells';

// export function Playground() {
//   const [cells, setCells] = useState(Cells());

//   const renderCells = () => {
//     console.log('render');
//     return cells.map((arr, i) =>
//       arr.map((cell, j) => {
//         return (
//           <Cell
//             key={i + j}
//             state={cell.state}
//             value={cell.value}
//             row={i}
//             col={j}
//           />
//         );
//       })
//     );
//   };

//   const handleRestart = (event) => {
//     const isGame = sessionStorage.getItem('game');
//     const face = document.querySelector('#smile');

//     if (face && face.contains(event.target) && isGame === 'false') {
//       setCells(Cells());
//     }
//   };

//   useEffect(() => {
//     setCells(Cells());
//   }, []);

//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       onClick={(event) => handleRestart(event)}
//       id="playground"
//       className="h-full w-full border-black border-2 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white grid grid-rows-16 grid-cols-16"
//     >
//       {renderCells()}
//     </div>
//   );
// }
