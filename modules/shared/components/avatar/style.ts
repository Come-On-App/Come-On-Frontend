import { makeStyles } from '@rneui/themed';

export default makeStyles((theme, size: number) => ({
  defaultStyle: {
    width: size,
    height: size,
    borderRadius: 20,
  },
  badgeColor: {
    color: theme.font.grayscale['500'],
  },
  defaultBadgeStyle: {
    backgroundColor: theme.font.grayscale['100'],
    elevation: 0,
    borderWidth: 0,
    shadowOpacity: 0,
  },
}));
