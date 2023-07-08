import { makeStyles } from '@rneui/themed';
import { DEFUALT_BUTTON_WIDTH } from '@shared/components/button/Button';
import { relativeSizeConverter } from '@shared/utils/utils';

export default makeStyles(() => ({
  container: {
    alignSelf: 'center',
    width: relativeSizeConverter(DEFUALT_BUTTON_WIDTH),
  },
}));
