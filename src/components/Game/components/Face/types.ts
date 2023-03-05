export enum FaceType {
  default = 'default',
  pressed = 'pressed',
  wowFace = 'wowFace',
  lost = 'lost',
  won = 'won',
}

export type FaceProps = {
  state: FaceType;
};
