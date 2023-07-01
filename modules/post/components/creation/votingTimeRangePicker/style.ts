import { makeStyles } from '@rneui/themed';
import { IconName } from '@shared/components/icon/type';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [CONTAINER_HEIGHT, CONTAINER_BORDER_RADIUS, CONTAINER_MARGIN_VERTICAL] =
    applyRelativeSizes({
      containerHeight: 48,
      containerBorderRadius: 4,
      containerMarginVertical: 5,
    });

  return {
    container: {
      borderWidth: 1,
      borderRadius: CONTAINER_BORDER_RADIUS,
      height: CONTAINER_HEIGHT,
      borderColor: theme.font.grayscale['200'],
      backgroundColor: theme.font.grayscale['0'],
      marginVertical: CONTAINER_MARGIN_VERTICAL,
    },
    icon: {
      name: 'date-range' as IconName,
      color: theme.font.grayscale['500'],
    },
    font: {
      color: theme.font.grayscale['500'],
    },
  };
});
