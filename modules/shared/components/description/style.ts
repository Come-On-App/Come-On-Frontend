import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [CONTAINER_MARGIN_BOTTOM_TOP, FONT_SIZE] = applyRelativeSizes({
    marginBottomTop: 20,
    fontSize: theme.font.type.title4.fontSize,
  });

  return {
    container: {
      marginBottom: CONTAINER_MARGIN_BOTTOM_TOP,
      marginTop: CONTAINER_MARGIN_BOTTOM_TOP,
    },
    font: {
      color: theme.font.grayscale['900'],
      fontSize: FONT_SIZE,
      textAlign: 'center',
    },
  };
});
