import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [INPUT_FONT_SIZE, LABEL_FONT_SIZE] = applyRelativeSizes({
    inputFontSize: theme.font.type.title4.fontSize,
    labelFontSize: theme.font.type.body1.fontSize,
  });

  return {
    inputOuterContainer: {
      flex: 1,
    },
    inputContainer: {
      paddingHorizontal: 0,
      alignItems: 'flex-start',
    },
    inputFont: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: INPUT_FONT_SIZE,
    },
    inputError: {
      height: 0,
      width: 0,
    },
    inputInnerContainer: {
      borderBottomWidth: 0,
    },
    labelFont: {
      fontSize: LABEL_FONT_SIZE,
    },
    iconButtonContainer: {
      backgroundColor: theme.font.grayscale['200'],
    },
    contentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 0,
    },
  };
});
