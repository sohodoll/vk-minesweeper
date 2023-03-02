import { SmileFace, ClickedFace, WowFace } from 'components/FaceSprites';

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
  return null;
}
