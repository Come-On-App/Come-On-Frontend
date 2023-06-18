import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  outerContainer: {
    paddingHorizontal: 0,
  },
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
  cPressableInput: {
    width: '100%',
    backgroundColor: theme.font.grayscale['200'],
    borderRadius: 4,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  cPressableInnerInput: {
    marginVertical: 4,
    marginLeft: 10,
    paddingRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cPressableInputIcon: {
    marginRight: 10,
  },
}));
