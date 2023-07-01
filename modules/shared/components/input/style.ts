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
    CONTAINER_PRESSABLE_INPUT_PADDING_VERTICAL,
    CONTAINER_PRESSABLE_INNER_INPUT_MARGIN_VERTICAL,
    CONTAINER_PRESSABLE_INNER_INPUT_MARGIN_LEFT,
    CONTAINER_PRESSABLE_INNER_INPUT_PADDING_RIGHT,
    CONTAINER_PRESSABLE_INPUT_ICON_MARGIN_RIGHT,
    BORDER_RADIUS,
  ] = applyRelativeSizes({
    inputFontSize: theme.font.type.body1.fontSize,
    inputContainerHeight: 44,
    inputContainerMarginVertical: 8,
    inputContainerPaddingHorizontal: 10,
    containerCodeFieldWidthHeigth: 50,
    containerCodeFieldMarginHorizontal: 2,
    codeFieldFontSize: theme.font.type.title1.fontSize,
    containerPressableInputPaddingVertical: 8,
    containerPressableInnerInputMarginVertical: 4,
    containerPressableInnerInputMarginLeft: 10,
    containerPressableInnerInputPaddingRight: 4,
    containerPressableInputIconMarginRight: 10,
    borderRadius: 4,
  });

  return {
    outerContainer: {
      paddingHorizontal: 0,
    },
    inputContainer: {
      marginVertical: INPUT_CONTAINER_MARGIN_VERTICAL,
      paddingHorizontal: INPUT_CONTAINER_PADDING_HORIZONTAL,
      borderWidth: 1,
      borderRadius: BORDER_RADIUS,
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
      borderRadius: BORDER_RADIUS,
      flexDirection: 'row',
      paddingVertical: CONTAINER_PRESSABLE_INPUT_PADDING_VERTICAL,
    },
    cPressableInnerInput: {
      marginVertical: CONTAINER_PRESSABLE_INNER_INPUT_MARGIN_VERTICAL,
      marginLeft: CONTAINER_PRESSABLE_INNER_INPUT_MARGIN_LEFT,
      paddingRight: CONTAINER_PRESSABLE_INNER_INPUT_PADDING_RIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    cPressableInputIcon: {
      marginRight: CONTAINER_PRESSABLE_INPUT_ICON_MARGIN_RIGHT,
    },
    cCodeField: {
      backgroundColor: theme.font.grayscale['100'],
      borderRadius: BORDER_RADIUS,
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
