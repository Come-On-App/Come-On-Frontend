import { makeStyles } from '@rneui/themed';
import { relativeSizeConverter } from '@shared/utils';

export default makeStyles(() => ({
  cContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeleton: {
    height: relativeSizeConverter(36),
  },
}));
