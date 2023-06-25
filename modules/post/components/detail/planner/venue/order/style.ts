import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.primary,
    width: 26,
    height: 26,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    color: theme.font.grayscale['0'],
    fontSize: theme.font.type.body1.fontSize,
  },
}));
