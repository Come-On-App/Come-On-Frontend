import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles(() => {
  const [
    CONTAINER_MODAL_HEIGHT,
    CONTAINER_MODAL_PADDING,
    CONTAINER_MODAL_RADIUS,
  ] = applyRelativeSizes({
    containerModalHeight: 235,
    padding: 28,
    radius: 8,
  });

  return {
    container: {
      width: '85%',
      height: CONTAINER_MODAL_HEIGHT,
      borderRadius: CONTAINER_MODAL_RADIUS,
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: CONTAINER_MODAL_PADDING,
    },
    cButton: {
      width: '100%',
    },
  };
});
