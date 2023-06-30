import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles(() => {
  const [CONTAINER_MARGIN_TOP, BUTTON_WIDTH] = applyRelativeSizes({
    marginTop: 60,
    buttonWidth: 192,
  });

  return {
    container: {
      marginTop: CONTAINER_MARGIN_TOP,
      alignSelf: 'center',
      width: BUTTON_WIDTH,
    },
  };
});
