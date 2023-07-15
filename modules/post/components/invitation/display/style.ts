import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [TITLE_FONT_SIZE, SUB_FONT_SIZE] = applyRelativeSizes({
    titleFontSize: theme.font.type.title3.fontSize,
    subFontSize: theme.font.type.body2.fontSize,
  });

  return {
    titleFont: {
      fontSize: TITLE_FONT_SIZE,
    },
    subTitleFont: {
      fontSize: SUB_FONT_SIZE,
      color: theme.font.grayscale[700],
    },
  };
});
