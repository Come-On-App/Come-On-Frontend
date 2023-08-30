import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme, hiddenIcon: boolean) => {
  const [
    DISPLAY_HEIGHT,
    DISPLAY_PADDING_HORIZONTAL,
    DISPLAY_PADDING_VERTICAL,
    DISPLAY_MARGIN_RIGHT,
    DISPLAY_BORDER_RADIUS,
    FONT_SIZE,
    ICON_SIZE,
    ICON_CONTAINER_MARGIN_TOP,
    IOCN_CONTAINER_MARGIN_RIGHT,
  ] = applyRelativeSizes({
    displayHeight: 24,
    displayPaddingHorizontal: 6,
    displayPaddingVertical: 3,
    displayMarginRight: 4,
    displayBorderRadius: 2,
    fontSize: theme.font.type.body3.fontSize,
    iconSize: 16,
    iconContainerMarginTop: 1,
    iconContainerMarginRight: 2,
  });

  return {
    cDisplay: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: hiddenIcon
        ? theme.font.grayscale['100']
        : theme.colors.primary,
      borderRadius: DISPLAY_BORDER_RADIUS,
      height: DISPLAY_HEIGHT,
      paddingHorizontal: DISPLAY_PADDING_HORIZONTAL,
      paddingVertical: DISPLAY_PADDING_VERTICAL,
      marginRight: DISPLAY_MARGIN_RIGHT,
    },
    font: {
      color: hiddenIcon
        ? theme.font.grayscale['500']
        : theme.font.grayscale['0'],
      fontSize: FONT_SIZE,
      alignSelf: 'center',
    },
    icon: {
      color: theme.font.grayscale['0'],
      size: ICON_SIZE,
    },
    cIcon: {
      marginTop: ICON_CONTAINER_MARGIN_TOP,
      marginRight: IOCN_CONTAINER_MARGIN_RIGHT,
    },
  };
});
