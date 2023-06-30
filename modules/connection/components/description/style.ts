import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [CONTAINER_MARGIN_BOTTOM, FONT_SIZE] = applyRelativeSizes({
    marginBottom: 20,
    fontSize: theme.font.type.title4.fontSize,
  });

  return {
    container: {
      marginBottom: CONTAINER_MARGIN_BOTTOM,
    },
    font: {
      color: theme.font.grayscale['900'],
      fontSize: FONT_SIZE,
      textAlign: 'center',
    },
  };
});
