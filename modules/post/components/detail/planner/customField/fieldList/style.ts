import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [EMPTY_FONT_SIZE] = applyRelativeSizes({
    emptyFontSize: theme.font.type.body2.fontSize,
  });

  return {
    emptyFontContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyFont: {
      fontSize: EMPTY_FONT_SIZE,
      color: theme.font.grayscale[700],
    },
    sectionListContainer: {
      flex: 1,
    },
    sectionContentContainer: {
      flexGrow: 1,
    },
  };
});
