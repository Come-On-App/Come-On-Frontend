import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [FONT_SIZE] = applyRelativeSizes({
    fontSize: theme.font.type.title1.fontSize,
  });

  return {
    cCodeField: {
      alignItems: 'center',
    },
    font: {
      fontSize: FONT_SIZE,
    },
  };
});
