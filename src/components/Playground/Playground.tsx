import { DefaultCell } from 'components/CellSprites';

export function Playground() {
  const elements: JSX.Element[] = new Array(256).fill(DefaultCell());

  return (
    <div className="h-full w-full border-black border-2 border-2 border-t-gray-400 border-l-gray-400 border-r-white border-b-white grid grid-rows-16 grid-cols-16">
      {elements.map((element, i) => {
        return <div key={i}>{element}</div>;
      })}
    </div>
  );
}
