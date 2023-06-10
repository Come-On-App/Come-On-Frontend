import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  cSearchBar: {
    width: '100%',
    height: 46,
    backgroundColor: theme.font.grayscale['200'],
    borderRadius: 4,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  cInputSearchBar: {
    marginVertical: 4,
    marginLeft: 10,
    paddingRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cSearchBarkIcon: {
    marginRight: 10,
  },
  searchBarkIcon: {
    color: theme.font.grayscale['700'],
    size: 20,
  },
  searchBarkFont: {
    fontSize: theme.font.type.body1.fontSize,
  },
}));
