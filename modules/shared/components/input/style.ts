import { SEARCH_ADN_CREATE_HEIGHT } from '@post/components/search/searchAndCreate/style';
import { makeStyles } from '@rneui/themed';

import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [
    INPUT_FONT_SIZE,
    INPUT_CONTAINER_HEIGHT,
    INPUT_CONTAINER_PADDING_HORIZONTAL,
    CONTAINER_CODE_FIELD_MARGIN_HORIZONTAL,
    CODE_FIELD_FONT_SIZE,
    CONTAINER_PRESSABLE_INNER_INPUT_MARGIN_LEFT,
    CONTAINER_PRESSABLE_INPUT_ICON_MARGIN_RIGHT,
    BORDER_RADIUS,
    CONTAINER_CODE_FIELD_WIDTH,
    CONTAINER_CODE_FIELD_HEIGHT,
  ] = applyRelativeSizes({
    inputFontSize: theme.font.type.body1.fontSize,
    inputContainerHeight: 44,
    inputContainerPaddingHorizontal: 10,
    containerCodeFieldMarginHorizontal: 2,
    codeFieldFontSize: theme.font.type.title1.fontSize,
    containerPressableInnerInputMarginLeft: 10,
    containerPressableInputIconMarginRight: 10,
    borderRadius: 4,
    containerCodeFieldWidth: 50,
    containerCodeFieldhHeigth: 58,
  });

  return {
    outerContainer: {
      paddingHorizontal: 0,
    },
    inputContainer: {
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
      height: SEARCH_ADN_CREATE_HEIGHT,
      backgroundColor: theme.font.grayscale['200'],
      borderRadius: BORDER_RADIUS,
      flexDirection: 'row',
    },
    cPressableInnerInput: {
      marginLeft: CONTAINER_PRESSABLE_INNER_INPUT_MARGIN_LEFT,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    cPressableInputIcon: {
      marginRight: CONTAINER_PRESSABLE_INPUT_ICON_MARGIN_RIGHT,
    },
    cCodeField: {
      overflow: 'hidden',
      backgroundColor: theme.font.grayscale['100'],
      borderRadius: BORDER_RADIUS,
      width: CONTAINER_CODE_FIELD_WIDTH,
      height: CONTAINER_CODE_FIELD_HEIGHT,
      marginHorizontal: CONTAINER_CODE_FIELD_MARGIN_HORIZONTAL,
    },
    codeFieldFont: {
      fontFamily: 'Pretendard-SemiBold',
      lineHeight: CONTAINER_CODE_FIELD_HEIGHT,
      textAlign: 'center',
      color: theme.font.grayscale['900'],
      fontSize: CODE_FIELD_FONT_SIZE,
    },
  };
});
