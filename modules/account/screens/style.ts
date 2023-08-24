import { makeStyles } from '@rneui/themed';

export default makeStyles((theme) => ({
  cAccountManagement: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signInContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  signInContainerLogo: {
    flex: 0.5,
  },
  signInContent: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    color: theme.font.grayscale[400],
  },
  loginError: {
    color: theme.colors.warning,
  },
}));
