import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [CONTENT_FONT_SIZE, TITLE_FONT_SIZE, ADDRESS_FONT_SIZE] =
    applyRelativeSizes({
      contentFontSize: theme.font.type.body1.fontSize,
      titleFontSize: theme.font.type.title4.fontSize,
      addressFontSize: theme.font.type.body3.fontSize,
    });

  return {
    contentFont: {
      fontSize: CONTENT_FONT_SIZE,
      color: theme.font.grayscale['700'],
    },
    titleFont: {
      fontSize: TITLE_FONT_SIZE,
    },
    addressFont: {
      fontSize: ADDRESS_FONT_SIZE,
      color: theme.font.grayscale['500'],
    },
  };
});
