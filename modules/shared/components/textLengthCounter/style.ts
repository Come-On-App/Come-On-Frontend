import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [FONT_SIZE] = applyRelativeSizes({
    fontSize: theme.font.type.body1.fontSize,
  });

  return {
    font: {
      fontSize: FONT_SIZE,
      color: theme.font.grayscale['500'],
    },
  };
});
