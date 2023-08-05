import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles(() => {
  const [CONTAINER_BUTTON_WIDHT, BUTTON_ICON_SIZE] = applyRelativeSizes({
    containerButtonWidth: 44,
    buttonIconSize: 24,
  });

  return {
    cButtonIcon: {
      width: CONTAINER_BUTTON_WIDHT,
      alignItems: 'center',
    },
    buttonIcon: {
      size: BUTTON_ICON_SIZE,
      color: '#231F20',
    },
  };
});
