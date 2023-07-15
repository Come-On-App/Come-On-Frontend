import { makeStyles } from '@rneui/themed';

export default makeStyles(
  (theme, props: { leftButtonColor?: string; rightButtonColor?: string }) => ({
    area: {
      flexDirection: 'row',
    },
    leftArea: {
      flex: 0.4,
      marginRight: 12,
    },
    leftButton: {
      backgroundColor: props.leftButtonColor
        ? props.leftButtonColor
        : theme.font.grayscale['300'],
    },
    rightArea: {
      flex: 0.6,
    },
    rightButton: {
      backgroundColor: props.rightButtonColor
        ? props.rightButtonColor
        : undefined,
    },
  }),
);
