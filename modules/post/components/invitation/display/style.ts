import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [FONT_SIZE] = applyRelativeSizes({
    fontSize: theme.font.type.title3.fontSize,
  });

  return {
    titleFont: {
      fontSize: FONT_SIZE,
    },
  };
});
