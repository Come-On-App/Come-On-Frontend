import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [
    BORDER_RADIUS,
    PADDING_VERTICAL,
    PADDING_HORIZONTAL,
    MARGIN_LEFT,
    HEIGHT,
    FONT_SIZE,
  ] = applyRelativeSizes({
    borderRadius: 2,
    paddingVertical: 1,
    paddingHorizontal: 3,
    marginLeft: 4,
    height: 15,
    fontSize: theme.font.type.caption.fontSize,
  });

  return {
    container: {
      borderRadius: BORDER_RADIUS,
      paddingVertical: PADDING_VERTICAL,
      paddingHorizontal: PADDING_HORIZONTAL,
      backgroundColor: theme.font.grayscale['200'],
      alignSelf: 'center',
      marginLeft: MARGIN_LEFT,
      height: HEIGHT,
    },
    font: {
      color: theme.font.grayscale['500'],
      fontSize: FONT_SIZE,
    },
  };
});
