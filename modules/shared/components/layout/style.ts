import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme, width: number) => {
  const [
    DIVIDER_WIDTH,
    PADDING_VERTICAL,
    PADDING_HORIZONTAL,
    CONTAINER_CONTENT_HEADER_MARGIN_TOP,
    CONTAINER_CONTENT_HEADER_MARGIN_BOTTOM,
  ] = applyRelativeSizes({
    width,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 28,
    marginBottom: 12,
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
    cContentHeader: {
      flexDirection: 'row',
      marginTop: CONTAINER_CONTENT_HEADER_MARGIN_TOP,
      marginBottom: CONTAINER_CONTENT_HEADER_MARGIN_BOTTOM,
    },
  };
});
