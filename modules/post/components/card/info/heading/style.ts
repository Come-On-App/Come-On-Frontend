import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles(() => {
  const [TOP_WRAP_HEIGHT, TOP_WRAP_MARGIN_TOP, TOP_WRAP_MARGIN_HORIZONTAL] =
    applyRelativeSizes({
      topWrapHeight: 24,
      topWrapMarginTop: 12,
      topwrapMarginHorizontal: 12,
    });

  return {
    cTopHeading: {
      flexDirection: 'row',
    },
    cTopWrap: {
      height: TOP_WRAP_HEIGHT,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: TOP_WRAP_MARGIN_TOP,
      marginHorizontal: TOP_WRAP_MARGIN_HORIZONTAL,
    },
  };
});
