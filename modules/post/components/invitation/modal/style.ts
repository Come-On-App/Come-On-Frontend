import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles(() => {
  const [CONTAINER_MODAL_HEIGHT] = applyRelativeSizes({
    containerModalHeight: 235,
  });

  return {
    container: {
      width: '85%',
      height: CONTAINER_MODAL_HEIGHT,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 28,
    },
  };
});
