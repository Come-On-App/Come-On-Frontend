import { makeStyles } from '@rneui/themed';
import { relativeSizeConverter } from '@shared/utils/utils';

export default makeStyles((theme) => {
  return {
    defaultStyle: {
      color: theme.font.grayscale['900'],
    },
    screenFont: {
      fontSize: relativeSizeConverter(theme.font.type.title4.fontSize),
    },
  };
});
