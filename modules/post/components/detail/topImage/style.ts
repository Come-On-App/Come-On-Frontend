import { makeStyles } from '@rneui/themed';

export default makeStyles((_theme, imageHeight: number) => ({
  image: {
    width: '100%',
    height: imageHeight,
    resizeMode: 'cover',
  },
  titleContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
}));
