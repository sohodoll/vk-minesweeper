import {
  SmileFace,
  ClickedFace,
  WowFace,
  LostFace,
} from 'components/FaceSprites';
import { WonFace } from 'components/FaceSprites/WonFace';
import { FaceProps, FaceType } from './types';

export function Face({ state }: FaceProps) {
  if (state === FaceType.default) {
    return SmileFace();
  }
  if (state === FaceType.pressed) {
    return ClickedFace();
  }
  if (state === FaceType.wowFace) {
    return WowFace();
  }
  if (state === FaceType.lost) {
    return LostFace();
  }
  if (state === FaceType.won) {
    return WonFace();
  }
  return null;
}
