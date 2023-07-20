import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [
    CONTAINER_WIDTH,
    CONTAINER_MARGIN_RIGHT,
    FONT_MARGIN_VERTICAL,
    FONT_SIZE,
  ] = applyRelativeSizes({
    containerWidth: 44,
    containserMarginRight: 12,
    fontMarginVertical: 5,
    fontSize: theme.font.type.body2.fontSize,
  });

  return {
    container: {
      alignItems: 'center',
      width: CONTAINER_WIDTH,
      marginRight: CONTAINER_MARGIN_RIGHT,
    },
    font: {
      marginVertical: FONT_MARGIN_VERTICAL,
      fontSize: FONT_SIZE,
      color: theme.font.grayscale['700'],
    },
  };
});
