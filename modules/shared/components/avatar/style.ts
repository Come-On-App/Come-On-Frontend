import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme, size: number) => {
  const [BORDER_RADIUS] = applyRelativeSizes({
    borderRadius: 20,
  });

  return {
    defaultStyle: {
      width: size,
      height: size,
      borderRadius: BORDER_RADIUS,
    },
    badgeColor: {
      color: theme.font.grayscale['500'],
    },
    defaultBadgeStyle: {
      backgroundColor: theme.font.grayscale['100'],
      elevation: 0,
      borderWidth: 0,
      shadowOpacity: 0,
    },
  };
});
