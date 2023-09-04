import { makeStyles } from '@rneui/themed';

export default makeStyles(() => {
  return {
    container: {
      padding: 5,
    },
    innerContainer: {
      marginVertical: 2,
    },

    track: {
      height: 8,
      backgroundColor: 'transparent',
    },
    thumb: {
      height: 1,
      width: 1,
      backgroundColor: 'transparent',
    },
  };
});
