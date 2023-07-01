import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles(() => {
  const [MAP_HEIGHT, MAP_BORDER_RADIUS] = applyRelativeSizes({
    mapHeight: 350,
    mapBorderRadius: 8,
  });

  return {
    cMap: {
      height: MAP_HEIGHT,
      borderRadius: MAP_BORDER_RADIUS,
      overflow: 'hidden',
    },
    map: {
      height: '100%',
      width: '100%',
    },
  };
});
