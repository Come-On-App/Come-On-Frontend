import { makeStyles } from '@rneui/themed';
import { DEFUALT_BUTTON_WIDTH } from '@shared/components/button/Button';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles(() => {
  const [CONTAINER_MARGIN_TOP, BUTTON_WIDTH] = applyRelativeSizes({
    marginTop: 60,
    buttonWidth: DEFUALT_BUTTON_WIDTH,
  });

  return {
    container: {
      marginTop: CONTAINER_MARGIN_TOP,
      alignSelf: 'center',
      width: BUTTON_WIDTH,
    },
  };
});
