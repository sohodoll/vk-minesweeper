import sprite from 'assets/sprites/sprite.png';

export const createSprite = (backgroundPosition: string, type?: string) => {
  let classname;

  if (type === 'cell') {
    classname = 'w-[1rem] h-4';
  } else if (type === 'smile') {
    classname = 'w-[1.6rem] h-[1.5rem]';
  } else {
    classname = 'w-[0.85rem] h-[1.4rem]';
  }

  return (
    <div
      id={type}
      className={classname}
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundPosition,
      }}
    />
  );
};
