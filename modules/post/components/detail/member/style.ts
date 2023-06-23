import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  outterContainer: {
    width: 44,
  },
  innerContainer: {
    alignItems: 'center',
  },
  font: {
    marginVertical: 5,
    fontSize: theme.font.type.body2.fontSize,
    color: theme.font.grayscale['700'],
  },
}));
