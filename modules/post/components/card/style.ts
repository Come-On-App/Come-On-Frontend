import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles(() => {
  const [CONTAINER_CARD_HEIGHT, CONTAINER_CARD_MARGIN_BOTTOM] =
    applyRelativeSizes({
      containerCardHeight: 255,
      containerCardMarginBottom: 5,
    });

  return {
    cCard: {
      justifyContent: 'center',
      height: CONTAINER_CARD_HEIGHT,
      marginBottom: CONTAINER_CARD_MARGIN_BOTTOM,
      padding: 0,
      elevation: 0,
      borderWidth: 0,
      shadowOpacity: 0,
    },
  };
});
