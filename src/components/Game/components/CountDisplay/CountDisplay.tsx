import {
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
} from 'components/NumberSprites';

type CountDisplayProps = {
  value: string;
};

const numberMap: Record<string, JSX.Element> = {
  '0': <Zero />,
  '1': <One />,
  '2': <Two />,
  '3': <Three />,
  '4': <Four />,
  '5': <Five />,
  '6': <Six />,
  '7': <Seven />,
  '8': <Eight />,
  '9': <Nine />,
};

export function CountDisplay({ value }: CountDisplayProps) {
  const displayContent = value
    .padStart(3, '0')
    .split('')
    .map((char, index) => <div key={index}>{numberMap[char]}</div>);

  return (
    <div className="flex bg-black p-[0.1rem] rounded">{displayContent}</div>
  );
}
