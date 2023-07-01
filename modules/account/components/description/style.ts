import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [EMAIL_FONT_SIZE, WELCOME_FONT_SIZE] = applyRelativeSizes({
    emailFontSize: theme.font.type.body1.fontSize,
    welcomeFontSize: theme.font.type.title3.fontSize,
  });

  return {
    emailFont: {
      fontSize: EMAIL_FONT_SIZE,
      color: theme.font.grayscale['500'],
    },
    welcomeFont: {
      fontSize: WELCOME_FONT_SIZE,
    },
  };
});
