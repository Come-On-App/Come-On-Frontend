import { makeStyles } from '@rneui/themed';

export default makeStyles((theme, isFixed: boolean) => ({
  container: {
    flexDirection: 'row',
    minHeight: 40,
  },
  divider: {
    backgroundColor: isFixed ? theme.colors.primary : theme.colors.secondary,
    width: 3,
    height: 36,
    alignSelf: 'center',
    borderRadius: 6,
    marginRight: 6,
  },
  cFont: {
    justifyContent: 'center',
  },
  rangeFont: {
    color: theme.font.grayscale['700'],
  },
  descriptionFont: {
    color: theme.font.grayscale['500'],
  },
}));
