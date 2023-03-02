import { useState } from 'react';
import { CountDisplay } from './components/CountDisplay';
import { Face } from './components/Face';

export function Header() {
  const [faceState, setFaceState] = useState('default');

  const handleFaceMouseDown = () => {
    setFaceState('clicked');
  };

  const handleFaceMouseUp = () => {
    setFaceState('default');
  };

  return (
    <div className="w-full h-12 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white flex justify-around items-center">
      <CountDisplay value="40" />
      <div
        role="button"
        tabIndex={0}
        onMouseDown={handleFaceMouseDown}
        onMouseUp={handleFaceMouseUp}
      >
        <Face state={faceState} />
      </div>

      <CountDisplay value="117" />
    </div>
  );
}
