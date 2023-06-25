import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  icon: {
    color: theme.font.grayscale['400'],
    size: 24,
  },
  menuFont: {
    color: theme.font.grayscale['900'],
    fontSize: theme.font.type.body2.fontSize,
  },
}));
