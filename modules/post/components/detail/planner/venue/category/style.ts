import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  container: {
    borderRadius: 2,
    paddingVertical: 1,
    paddingHorizontal: 3,
    backgroundColor: theme.font.grayscale['200'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    color: theme.font.grayscale['500'],
    fontSize: 10,
  },
}));
