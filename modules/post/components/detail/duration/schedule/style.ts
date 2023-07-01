import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme, isFixed: boolean) => {
  const [DIVIDER_WIDTH, DIVIDER_HEIGHT, BORDER_RADIUS, BORDER_MARGIN_RIGHT] =
    applyRelativeSizes({
      dividerWidth: 3,
      dividerHeight: 36,
      borderRadius: 6,
      borderMarginRight: 6,
    });

  return {
    container: {
      flexDirection: 'row',
    },
    divider: {
      backgroundColor: isFixed ? theme.colors.primary : theme.colors.secondary,
      width: DIVIDER_WIDTH,
      height: DIVIDER_HEIGHT,
      alignSelf: 'center',
      borderRadius: BORDER_RADIUS,
      marginRight: BORDER_MARGIN_RIGHT,
    },
    cFont: {
      justifyContent: 'center',
    },
    rangeFont: {
      color: theme.font.grayscale['700'],
    },
    descriptionFont: {
      color: theme.font.grayscale['500'],
    },
  };
});
