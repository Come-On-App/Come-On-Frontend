import { makeStyles } from '@rneui/themed';
import { relativeSizeConverter } from '@shared/utils/utils';

export const SEARCH_ADN_CREATE_HEIGHT = relativeSizeConverter(44);

export default makeStyles(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: relativeSizeConverter(5),
  },
}));
