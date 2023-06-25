import { makeStyles } from '@rneui/themed';

export default makeStyles((theme, isHost?: boolean) => ({
  cTimePickerButton: {
    backgroundColor: isHost
      ? theme.font.grayscale['400']
      : theme.font.grayscale['100'],
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 35,
  },
  font: {
    fontSize: theme.font.type.body1.fontSize,
    lineHeight: theme.font.type.body1.lineHeight,
    color: theme.font.grayscale[900],
  },
}));
