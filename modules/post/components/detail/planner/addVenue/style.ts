import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [
    CONTAINER_HEIGHT,
    CONTAINER_PADDING_VERTICAL,
    CONTAINER_PADDING_HORIZONTAL,
    CONTAINER_BORDER_RADIUS,
    ICON_SIZE,
    FONT_PADDING_TOP,
    OUTER_CONTAINER_PADDING_BOTTOM,
  ] = applyRelativeSizes({
    height: 80,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    iconSize: 24,
    fontPaddingTop: 4,
    paddingBottom: 20,
  });

  return {
    container: {
      height: CONTAINER_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: CONTAINER_PADDING_VERTICAL,
      paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
      borderWidth: 1,
      borderRadius: CONTAINER_BORDER_RADIUS,
      borderStyle: 'dashed',
    },
    icon: {
      size: ICON_SIZE,
      color: theme.font.grayscale['500'],
    },
    font: {
      paddingTop: FONT_PADDING_TOP,
      color: theme.font.grayscale['700'],
    },
    outerContainer: {
      paddingBottom: OUTER_CONTAINER_PADDING_BOTTOM,
    },
  };
});
