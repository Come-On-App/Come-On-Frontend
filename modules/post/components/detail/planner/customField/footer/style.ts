import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((_theme, isKeyboardOpen?: boolean) => {
  const [CONATINER_MARGIN_TOP] = applyRelativeSizes({
    marginTop: 48,
  });

  return {
    container: {
      display: isKeyboardOpen ? 'none' : 'flex',
      marginTop: isKeyboardOpen ? -CONATINER_MARGIN_TOP : undefined,
      opacity: isKeyboardOpen ? 0 : undefined,
    },
  };
});
