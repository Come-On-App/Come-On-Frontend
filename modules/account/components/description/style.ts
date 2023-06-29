import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  emailFont: {
    fontSize: theme.font.type.body1.fontSize,
    color: theme.font.grayscale['500'],
  },
  welcomeFont: {
    fontSize: theme.font.type.title3.fontSize,
  },
}));
