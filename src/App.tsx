import { Header } from 'components/Header';
import { Playground } from 'components/Playground';

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-300 flex flex-col items-center p-4 gap-4 rounded shadow-md">
        <Header />
        <Playground />
      </div>
    </div>
  );
}

export default App;
