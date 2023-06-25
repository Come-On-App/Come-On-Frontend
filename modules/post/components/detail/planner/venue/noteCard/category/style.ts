import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  container: {
    borderRadius: 2,
    paddingVertical: 1,
    paddingHorizontal: 3,
    backgroundColor: theme.font.grayscale['200'],
    alignSelf: 'center',
    marginLeft: 4,
    height: 15,
  },
  font: {
    color: theme.font.grayscale['500'],
    fontSize: theme.font.type.caption.fontSize,
  },
}));
