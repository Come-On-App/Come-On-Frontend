import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [FONT_SIZE] = applyRelativeSizes({
    fontSize: theme.font.type.body3.fontSize,
  });

  return {
    container: { alignSelf: 'flex-end' },
    font: {
      fontSize: FONT_SIZE,
      color: theme.font.grayscale['500'],
    },
  };
});
