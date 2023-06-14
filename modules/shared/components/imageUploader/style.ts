import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  wrap: {
    height: 200,
    borderRadius: 8,
    marginVertical: 5,
  },
  imageUploader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.font.grayscale['100'],
  },
  font: {
    color: theme.font.grayscale['500'],
  },
  icon: {
    color: theme.font.grayscale['500'],
    size: 28,
  },
}));
