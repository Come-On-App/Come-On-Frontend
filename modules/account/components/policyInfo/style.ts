import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [CONTENT_HEIGHT, FONT_SIZE, ICON_SIZE] = applyRelativeSizes({
    height: 48,
    font: 16,
    iconSize: 20,
  });

  return {
    cContent: {
      height: CONTENT_HEIGHT,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    font: {
      fontSize: FONT_SIZE,
    },
    icon: {
      fontSize: ICON_SIZE,
      color: theme.font.grayscale['600'],
    },
  };
});
