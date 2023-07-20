import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme, isHost?: boolean) => {
  const [
    BUTTON_BORDER_RADIUS,
    BUTTON_HEIGHT,
    BUTTON_PADDING_HORIZONTAL,
    BUTTON_PADDING_VERTICAL,
    FONT_SIZE,
  ] = applyRelativeSizes({
    buttonBorderRadius: 4,
    buttonHeight: 36,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: theme.font.type.body1.fontSize,
  });

  return {
    button: {
      height: BUTTON_HEIGHT,
      borderRadius: BUTTON_BORDER_RADIUS,
      backgroundColor: isHost
        ? theme.font.grayscale['400']
        : theme.font.grayscale['100'],
      paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
      paddingVertical: BUTTON_PADDING_VERTICAL,
    },
    font: {
      fontSize: FONT_SIZE,
      color: theme.font.grayscale[900],
    },
  };
});
