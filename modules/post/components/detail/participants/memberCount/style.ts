import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [CONTAINER_MARGIN_HORIZONTAL, FONT_SIZE] = applyRelativeSizes({
    containerMarginHorizontal: 4,
    fontSize: theme.font.type.title4.fontSize,
  });

  return {
    container: {
      marginHorizontal: CONTAINER_MARGIN_HORIZONTAL,
      justifyContent: 'center',
    },
    font: {
      fontSize: FONT_SIZE,
      color: theme.colors.primary,
    },
  };
});
