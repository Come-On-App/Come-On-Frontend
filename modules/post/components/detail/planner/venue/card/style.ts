import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme, showRightIcon?: boolean) => {
  const [
    CONTAINER_BORDER_WIDHT,
    CONTAINER_BORDER_RADIUS,
    CONTAINER_PADDING_VERTICAL,
    CONTAINER_PADDING_HORIZONTAL,
    CONTAINER_DESCRIPTION_MARGIN_TOP,
  ] = applyRelativeSizes({
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    containerDescriptionMarginTop: 4,
  });

  return {
    container: {
      borderColor: theme.font.grayscale['200'],
      borderWidth: CONTAINER_BORDER_WIDHT,
      borderRadius: CONTAINER_BORDER_RADIUS,
      paddingVertical: CONTAINER_PADDING_VERTICAL,
      paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
      justifyContent: 'space-between',
      flexDirection: 'row',
      overflow: 'hidden',
    },
    cContent: {
      maxWidth: showRightIcon ? '80%' : '100%',
      width: showRightIcon ? '80%' : '100%',
      justifyContent: 'center',
    },
    cTitle: {
      flexDirection: 'row',
    },
    cDescription: {
      marginTop: CONTAINER_DESCRIPTION_MARGIN_TOP,
    },
    cMenu: {
      justifyContent: 'center',
    },
  };
});
