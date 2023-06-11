import { makeStyles } from '@rneui/themed';

export const height = 46;

export default makeStyles(() => ({
  container: {
    height,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
}));
