import { makeStyles } from '@rneui/themed';

export default makeStyles(() => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  cOrder: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  cNoteCard: {
    flex: 0.9,
  },
}));
