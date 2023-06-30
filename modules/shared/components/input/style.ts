import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [
    INPUT_FONT_SIZE,
    INPUT_CONTAINER_HEIGHT,
    INPUT_CONTAINER_MARGIN_VERTICAL,
    INPUT_CONTAINER_PADDING_HORIZONTAL,
    CONTAINER_CODE_FIELD_WIDTH_HEIGHT,
    CONTAINER_CODE_FIELD_MARGIN_HORIZONTAL,
    CODE_FIELD_FONT_SIZE,
  ] = applyRelativeSizes({
    inputFontSize: theme.font.type.body1.fontSize,
    inputContainerHeight: 44,
    inputContainerMarginVertical: 8,
    inputContainerPaddingHorizontal: 10,
    containerCodeFieldWidthHeigth: 50,
    containerCodeFieldMarginHorizontal: 2,
    codeFieldFontSize: theme.font.type.title1.fontSize,
  });

  return {
    outerContainer: {
      paddingHorizontal: 0,
    },
    inputContainer: {
      marginVertical: INPUT_CONTAINER_MARGIN_VERTICAL,
      paddingHorizontal: INPUT_CONTAINER_PADDING_HORIZONTAL,
      borderWidth: 1,
      borderRadius: 4,
      height: INPUT_CONTAINER_HEIGHT,
      borderColor: theme.font.grayscale['200'],
    },
    placeholderText: {
      color: theme.font.grayscale['500'],
    },
    font: {
      fontSize: INPUT_FONT_SIZE,
    },
    cPressableInput: {
      width: '100%',
      backgroundColor: theme.font.grayscale['200'],
      borderRadius: 4,
      flexDirection: 'row',
      paddingVertical: 8,
    },
    cPressableInnerInput: {
      marginVertical: 4,
      marginLeft: 10,
      paddingRight: 4,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    cPressableInputIcon: {
      marginRight: 10,
    },
    cCodeField: {
      backgroundColor: theme.font.grayscale['100'],
      borderRadius: 4,
      width: CONTAINER_CODE_FIELD_WIDTH_HEIGHT,
      height: CONTAINER_CODE_FIELD_WIDTH_HEIGHT,
      marginHorizontal: CONTAINER_CODE_FIELD_MARGIN_HORIZONTAL,
    },
    codeFieldFont: {
      fontFamily: 'Pretendard-SemiBold',
      lineHeight: CONTAINER_CODE_FIELD_WIDTH_HEIGHT,
      textAlign: 'center',
      color: theme.font.grayscale['900'],
      fontSize: CODE_FIELD_FONT_SIZE,
    },
  };
});
