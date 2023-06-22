import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  area: {
    flexDirection: 'row',
  },
  leftArea: {
    flex: 0.3,
    marginRight: 12,
  },
  leftButton: {
    backgroundColor: theme.font.grayscale['300'],
  },
  rightArea: {
    flex: 0.7,
  },
}));
