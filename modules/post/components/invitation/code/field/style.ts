import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [
    FONT_SIZE,
    FIELD_WIDTH,
    FIELD_HEIGHT,
    FIELD_PADDING_VERTICAL,
    FIELD_PADDING_HORIZONTAL,
    FIELD_BORDER_RADIUS,
    FIELD_MARGIN_HORIZONTAL,
  ] = applyRelativeSizes({
    fontSize: theme.font.type.title2.fontSize,
    width: 30,
    height: 40,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  });

  return {
    fieldContainer: {
      backgroundColor: theme.font.grayscale['200'],
      width: FIELD_WIDTH,
      height: FIELD_HEIGHT,
      paddingVertical: FIELD_PADDING_VERTICAL,
      paddingHorizontal: FIELD_PADDING_HORIZONTAL,
      borderRadius: FIELD_BORDER_RADIUS,
      marginHorizontal: FIELD_MARGIN_HORIZONTAL,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fieldFont: {
      fontSize: FONT_SIZE,
    },
  };
});
