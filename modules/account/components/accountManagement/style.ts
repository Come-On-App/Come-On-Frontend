import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles((theme) => {
  const [FONT_SIZE] = applyRelativeSizes(
    Object.values({
      FontSzie: theme.font.type.body1.fontSize,
    }),
  );

  return {
    container: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    font: {
      color: theme.font.grayscale['400'],
      fontSize: FONT_SIZE,
    },
  };
});
