import sprite from 'assets/sprites/sprite.png';

export const createNumberSprite = (backgroundPosition: string) => {
  return (
    <div
      className="w-[0.87rem] h-6"
      style={{
        backgroundImage: `url(${sprite})`,
        backgroundPosition,
      }}
    />
  );
};
