// import { Header } from 'components/Header';
// import { Playground } from 'components/Playground';

import { Game } from 'components/Game';

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-300 flex flex-col items-center p-4 gap-4 rounded shadow-md">
        <Game />
      </div>
    </div>
  );
}

export default App;
