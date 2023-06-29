import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

const [INPUT_CONTAINER_HEIGHT, INPUT_FONT_SIZE] = applyRelativeSizes([48, 14]);

export default makeStyles((theme) => ({
  outerContainer: {
    paddingHorizontal: 0,
  },
  inputContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    height: INPUT_CONTAINER_HEIGHT,
    borderColor: theme.font.grayscale['200'],
  },
  placeholderText: {
    color: theme.font.grayscale['500'],
  },
  font: {
    fontSize: INPUT_FONT_SIZE,
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
  cCodeField: {
    backgroundColor: theme.font.grayscale['100'],
    borderRadius: 4,
    width: 50,
    height: 50,
    marginHorizontal: 2,
  },
  codeFieldFont: {
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 50,
    textAlign: 'center',
    color: theme.font.grayscale['900'],
    fontSize: 26,
  },
}));
