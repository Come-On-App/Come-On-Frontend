import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [FONT_SIZE, CONTAINER_MARGIN_BOTTOM] = applyRelativeSizes({
    FontSzie: theme.font.type.body3.fontSize,
    marginBottom: 10,
  });

  return {
    container: {
      flexDirection: 'row',
      marginBottom: CONTAINER_MARGIN_BOTTOM,
    },
    font: {
      color: theme.font.grayscale['400'],
      fontSize: FONT_SIZE,
    },
  };
});
