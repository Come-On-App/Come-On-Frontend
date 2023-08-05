import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [ICON_SIZE, MENU_FONT, BORDER_RADIUS] = applyRelativeSizes({
    iconSize: 24,
    menuFont: theme.font.type.body2.fontSize,
    borderRadius: 6,
  });

  return {
    icon: {
      color: theme.font.grayscale['0'],
      size: ICON_SIZE,
    },
    menuFont: {
      color: theme.font.grayscale['900'],
      fontSize: MENU_FONT,
    },
    anchorBackground: {
      borderRadius: BORDER_RADIUS,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  };
});
