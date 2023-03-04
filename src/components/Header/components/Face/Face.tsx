import {
  SmileFace,
  ClickedFace,
  WowFace,
  LostFace,
} from 'components/FaceSprites';
import { WonFace } from 'components/FaceSprites/WonFace';

export function Face(props: { state: string }) {
  const { state } = props;

  if (state === 'default') {
    return SmileFace();
  }
  if (state === 'clicked') {
    return ClickedFace();
  }
  if (state === 'cellPressed') {
    return WowFace();
  }
  if (state === 'lost') {
    return LostFace();
  }
  if (state === 'won') {
    return WonFace();
  }
  return null;
}
