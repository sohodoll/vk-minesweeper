import { CountDisplay } from './components/CountDisplay';

export function Header() {
  return (
    <div className="w-full h-16 p-2 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white flex justify-around items-center">
      <CountDisplay />
      <div>Face</div>
      <CountDisplay />
    </div>
  );
}
