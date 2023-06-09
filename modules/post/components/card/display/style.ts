import { makeStyles } from '@rneui/themed';

export default makeStyles((theme, hiddenIcon: boolean) => ({
  contianer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: hiddenIcon
      ? theme.font.grayscale['100']
      : theme.colors.primary,
    borderRadius: 2,
    maxWidth: 64,
    height: 24,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
  },
  font: {
    color: hiddenIcon ? theme.font.grayscale['500'] : theme.font.grayscale['0'],
    fontSize: theme.font.type.body3.fontSize,
    lineHeight: theme.font.type.body3.lineHeight,
  },
  icon: {
    color: theme.font.grayscale['0'],
    size: 16,
  },
  iconContainer: {
    marginTop: 1,
    marginRight: 2,
  },
  displayStatus: {
    flexDirection: 'row',
  },
}));
