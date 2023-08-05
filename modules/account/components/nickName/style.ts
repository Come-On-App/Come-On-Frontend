import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [
    ICONE_SIZE,
    NICKNAME_TITLE_FONT_SIZE,
    TEXT_LENGTH_FONT_SIZE,
    LABEL_CONTAINER_PADDING_HORIZONTAL,
    LABEL_CONTAINER_MARGIN_BOTTOM,
  ] = applyRelativeSizes({
    iconSize: 20,
    nickNameTitleFontSize: theme.font.type.body3.fontSize,
    textLengthFontSize: theme.font.type.body3.fontSize,
    paddingHorizontal: 3,
    marginBottom: 8,
  });

  return {
    iconButton: {
      color: theme.font.grayscale['500'],
      fontSize: ICONE_SIZE,
    },
    nickNameTitleFont: {
      fontSize: NICKNAME_TITLE_FONT_SIZE,
      color: theme.font.grayscale['900'],
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: LABEL_CONTAINER_PADDING_HORIZONTAL,
      marginBottom: LABEL_CONTAINER_MARGIN_BOTTOM,
    },
    textLengthFont: {
      fontSize: TEXT_LENGTH_FONT_SIZE,
    },
  };
});
