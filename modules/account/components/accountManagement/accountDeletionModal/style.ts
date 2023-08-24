import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [HEIGHT] = applyRelativeSizes({
    height: 40,
  });

  return {
    cButton: {
      width: '100%',
    },
    box: {
      height: HEIGHT,
    },
    rightButton: {
      color: theme.colors.warning,
    },
  };
});
