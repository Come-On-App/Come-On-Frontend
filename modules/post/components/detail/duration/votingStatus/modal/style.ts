import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [HEADER_HEIGHT, SUB_MESSAGE_MARGIN_RIGHT, MODAL_PADDING_HORIZONTAL] =
    applyRelativeSizes({
      headerHeight: 54,
      subMessageMarginRight: 10,
      modalPaddingHorizontal: 28,
    });

  return {
    modalStyle: {
      padding: 0,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      overflow: 'hidden',
    },
    modalContainer: {
      flex: 1,
      paddingHorizontal: MODAL_PADDING_HORIZONTAL,
    },
    messageStyle: {
      color: theme.font.grayscale['700'],
    },
    subMessageStyle: {
      alignSelf: 'flex-end',
      marginRight: SUB_MESSAGE_MARGIN_RIGHT,
    },
    headerContainer: {
      backgroundColor: theme.font.grayscale['100'],
      width: '100%',
      height: HEADER_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spacerStyle: {
      height: 15,
    },
  };
});
