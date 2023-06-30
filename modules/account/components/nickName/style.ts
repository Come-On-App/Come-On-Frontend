import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [
    ICONE_SIZE,
    NICKNAME_TITLE_FONT_SIZE,
    TEXT_LENGTH_FONT_SIZE,
    LABEL_CONTAINER_PADDING_HORIZONTAL,
  ] = applyRelativeSizes({
    iconSize: 20,
    nickNameTitleFontSize: theme.font.type.body3.fontSize,
    textLengthFontSize: theme.font.type.body3.fontSize,
    paddingHorizontal: 3,
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
    },
    textLengthFont: {
      fontSize: TEXT_LENGTH_FONT_SIZE,
    },
  };
});
