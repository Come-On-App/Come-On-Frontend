import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    width: 44,
    marginRight: 12,
  },
  font: {
    marginVertical: 5,
    fontSize: theme.font.type.body2.fontSize,
    color: theme.font.grayscale['700'],
  },
}));
