import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  titleFont: {
    color: theme.font.grayscale['900'],
    fontSize: theme.font.type.title3.fontSize,
    lineHeight: theme.font.type.title3.lineHeight,
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
