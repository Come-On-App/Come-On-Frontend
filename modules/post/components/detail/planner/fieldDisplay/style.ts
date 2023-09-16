import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme, isError?: boolean) => {
  const [
    FIELD_ICON_SIZE,
    NOTE_CONTAINER_PADDING,
    NOTE_CONTAINER_BORDER_RADIUS,
  ] = applyRelativeSizes({
    fieldIconSize: 20,
    noteContainerPadding: 10,
    noteContainerBorderRadius: 4,
  });

  return {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      size: FIELD_ICON_SIZE,
      color: theme.font.grayscale['600'],
    },
    fontContainer: {
      marginLeft: 5,
    },
    telfont: {
      color: isError ? undefined : theme.colors.warning,
    },
    noteContainer: {
      padding: NOTE_CONTAINER_PADDING,
      borderWidth: 1,
      borderRadius: NOTE_CONTAINER_BORDER_RADIUS,
      borderColor: theme.font.grayscale['200'],
    },
    linkContainer: {
      maxWidth: '95%',
      marginLeft: 5,
    },
    linkFont: {
      width: '100%',
      color: isError ? '#24ABE4' : theme.colors.warning,
    },
  };
});
