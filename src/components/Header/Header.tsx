import { CountDisplay } from './components/CountDisplay';
import { Face } from './components/Face';

export function Header() {
  return (
    <div className="w-full h-12 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white flex justify-around items-center">
      <CountDisplay value="040" />
      <Face />
      <CountDisplay value="117" />
    </div>
  );
}
