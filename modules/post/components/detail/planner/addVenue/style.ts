import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  container: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: 'dashed',
  },
  icon: {
    size: 24,
    color: theme.font.grayscale['500'],
  },
  font: {
    paddingTop: 4,
    color: theme.font.grayscale['700'],
  },
}));
