import { useState, useEffect, useRef } from 'react';
import { CountDisplay } from './components/CountDisplay';
import { Face } from './components/Face';

export function Header() {
  const [faceState, setFaceState] = useState('default');
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timer>();

  const handleFaceMouseUp = () => {
    setFaceState('default');
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;

      if (clickedElement.id === 'smile') {
        setFaceState('clicked');
        setTime(0);
        sessionStorage.setItem('game', 'false');
        sessionStorage.setItem('isTimer', 'false');

        clearInterval(timerRef.current);
      } else if (clickedElement.id === 'cell') {
        setFaceState('cellPressed');
        const game = sessionStorage.getItem('game');
        const isTimer = sessionStorage.getItem('isTimer');

        if ((game === 'true' && isTimer === 'false') || !isTimer) {
          sessionStorage.setItem('isTimer', 'true');
          timerRef.current = setInterval(() => {
            setTime((t) => t + 1);
          }, 1000);
        }

        if (game === 'won' || game === 'false') {
          clearInterval(timerRef.current);
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
      clearInterval(timerRef.current);
    };
  }, []);

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
