import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [CONTAINER_WIDHT_HEIGHT_RADIUS, FONT_SIZE] = applyRelativeSizes({
    containerWidthHeight: 26,
    fontSize: theme.font.type.body1.fontSize,
  });

  return {
    container: {
      backgroundColor: theme.colors.primary,
      width: CONTAINER_WIDHT_HEIGHT_RADIUS,
      height: CONTAINER_WIDHT_HEIGHT_RADIUS,
      borderRadius: CONTAINER_WIDHT_HEIGHT_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
    },
    font: {
      color: theme.font.grayscale['0'],
      fontSize: FONT_SIZE,
    },
  };
});
