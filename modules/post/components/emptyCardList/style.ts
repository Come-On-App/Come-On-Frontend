import { makeStyles } from '@rneui/themed';
import { relativeSizeConverter } from '@shared/utils';

export default makeStyles(() => ({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: relativeSizeConverter(100),
    height: relativeSizeConverter(100),
    alignSelf: 'center',
  },
}));
