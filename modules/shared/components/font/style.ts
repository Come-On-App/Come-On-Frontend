import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [DEFAULT_FONT_SIZE, SCREEN_FONT_SIZE] = applyRelativeSizes({
    defaultFontSize: theme.font.type.body1.fontSize,
    screenFontSize: theme.font.type.title4.fontSize,
  });

  return {
    defaultStyle: {
      color: theme.font.grayscale['900'],
      fontSize: DEFAULT_FONT_SIZE,
    },
    screenFont: {
      fontSize: SCREEN_FONT_SIZE,
    },
  };
});
