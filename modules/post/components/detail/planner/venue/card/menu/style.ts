import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [ICON_SIZE, MENU_FONT_SIZE] = applyRelativeSizes({
    iconSize: 24,
    menuFontSize: theme.font.type.body2.fontSize,
  });

  return {
    icon: {
      color: theme.font.grayscale['400'],
      size: ICON_SIZE,
    },
    menuFont: {
      color: theme.font.grayscale['900'],
      fontSize: MENU_FONT_SIZE,
    },
  };
});
