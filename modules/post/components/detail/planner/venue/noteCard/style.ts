import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  container: {
    minHeight: 80,
    borderColor: theme.font.grayscale['200'],
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cContent: {
    maxWidth: '90%',
  },
  cTitle: {
    flexDirection: 'row',
    maxWidth: '90%',
  },
  cDescription: {
    marginTop: 4,
  },
  cMenu: {
    justifyContent: 'center',
  },
}));
