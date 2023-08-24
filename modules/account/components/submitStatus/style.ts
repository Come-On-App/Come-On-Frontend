import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme, backgroundColor: string) => {
  const [FONT_SIZE, BORDER_RADIUS, PADDING] = applyRelativeSizes({
    font: theme.font.type.caption.fontSize,
    borderRadius: 6,
    padding: 4,
  });

  return {
    container: {
      width: '100%',
      position: 'absolute',
      alignItems: 'flex-end',
    },
    font: {
      fontSize: FONT_SIZE,
      color: 'white',
      backgroundColor: backgroundColor || '#24ABE4',
      overflow: 'hidden',
      borderRadius: BORDER_RADIUS,
      padding: PADDING,
    },
  };
});
