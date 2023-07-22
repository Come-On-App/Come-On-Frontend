import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles(() => {
  const [
    WRAP_MARGIN_TOP,
    ROBOT_WIDTH,
    ROBOT_HEIGTH,
    CONTAINER_MARGIN_TOP,
    MESSAGE_FONT_SIZE,
  ] = applyRelativeSizes({
    wrapMarginTop: 10,
    robotWidth: 100,
    robotHight: 100,
    cMessageMarginTop: 7,
    messageFontSize: 14,
  });

  return {
    wrap: {
      marginTop: WRAP_MARGIN_TOP,
      flexDirection: 'row',
    },
    robot: {
      width: ROBOT_WIDTH,
      height: ROBOT_HEIGTH,
    },
    cMessage: {
      marginTop: CONTAINER_MARGIN_TOP,
    },
    messageFont: {
      fontSize: MESSAGE_FONT_SIZE,
    },
  };
});
