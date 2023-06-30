import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme, width: number) => {
  const [DIVIDER_WIDTH, PADDING_VERTICAL, PADDING_HORIZONTAL] =
    applyRelativeSizes({
      width,
      paddingVertical: 10,
      paddingHorizontal: 15,
    });

  return {
    dividerStyle: {
      width: DIVIDER_WIDTH,
      color: theme.font.grayscale['100'],
    },
    container: {
      paddingVertical: PADDING_VERTICAL,
      paddingHorizontal: PADDING_HORIZONTAL,
    },
  };
});
