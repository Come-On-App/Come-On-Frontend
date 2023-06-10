import { makeStyles } from '@rneui/themed';

export default makeStyles((theme, hiddenIcon: boolean) => ({
  cDisplay: {
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
  titleFont: {
    color: theme.font.grayscale['900'],
    fontSize: theme.font.type.title3.fontSize,
    lineHeight: theme.font.type.title3.lineHeight,
  },
  icon: {
    color: theme.font.grayscale['0'],
    size: 16,
  },
  cIcon: {
    marginTop: 1,
    marginRight: 2,
  },
  displayStatus: {
    flexDirection: 'row',
  },
  cSubTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  subTitleIcon: {
    color: theme.font.grayscale['600'],
    size: 16,
  },
  subTitleFont: {
    color: theme.font.grayscale['600'],
    fontSize: theme.font.type.body2.fontSize,
    lineHeight: theme.font.type.body2.lineHeight,
  },
  divider: {
    marginHorizontal: 5,
    height: 12,
    color: theme.font.grayscale['300'],
    width: 1,
  },
  dividerBorder: {
    color: theme.font.grayscale['300'],
    width: 1,
  },
}));
