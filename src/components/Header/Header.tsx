import { useState, useEffect } from 'react';
import { CountDisplay } from './components/CountDisplay';
import { Face } from './components/Face';

export function Header() {
  const [faceState, setFaceState] = useState('default');
  let [time, setTime] = useState(0);

  const handleFaceMouseUp = () => {
    setFaceState('default');
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      if (clickedElement.id === 'smile') {
        setFaceState('clicked');
      } else if (clickedElement.id === 'cell') {
        setFaceState('cellPressed');
        const game = sessionStorage.getItem('game');
        const isTimer = sessionStorage.getItem('isTimer');

        let timer;

        if (game === 'true' && !isTimer) {
          sessionStorage.setItem('isTimer', 'true');
          timer = setInterval(() => {
            setTime(time++);
          }, 1000);
        }

        if (game === 'won') {
          clearInterval(timer);
        }
      }
    };

    const handleMouseUp = () => {
      setFaceState('default');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
    <div className="w-full h-12 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white flex justify-around items-center">
      <CountDisplay value="40" />
      <div role="button" tabIndex={0} onMouseUp={handleFaceMouseUp}>
        <Face state={faceState} />
      </div>

      <CountDisplay value={String(time)} />
    </div>
  );
}
