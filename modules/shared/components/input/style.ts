import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  inputContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    borderColor: theme.font.grayscale['200'],
  },
  placeholderText: {
    color: theme.font.grayscale['500'],
  },
  font: {
    fontSize: 14,
  },
}));
