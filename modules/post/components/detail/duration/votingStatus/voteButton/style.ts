import { makeStyles } from '@rneui/themed';

export default makeStyles((theme, myVoting: boolean) => ({
  button: {
    color: myVoting ? theme.colors.primary : theme.colors.secondary,
  },
}));
