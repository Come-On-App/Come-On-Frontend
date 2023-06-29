import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

const [ICONE_SIZE, NICKNAME_TITLE_FONT_SIZE, TEXT_LENGTH_FONT_SIZE] =
  applyRelativeSizes(
    Object.values({
      iconSize: 20,
      nickNameTitleFontSize: 12,
      textLengthFontSize: 12,
    }),
  );

export default makeStyles((theme) => ({
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
    paddingHorizontal: 3,
  },
  textLengthFont: {
    fontSize: TEXT_LENGTH_FONT_SIZE,
  },
}));
