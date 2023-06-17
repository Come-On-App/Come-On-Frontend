import { makeStyles } from '@rneui/themed';

export default makeStyles(
  (theme, props: { bold?: boolean; backgroundColor?: string }) => ({
    defaultStyle: {
      height: 48,
      borderRadius: 4,
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : theme.colors.primary,
    },
    font: {
      color: theme.font.grayscale['0'],
      fontSize: theme.font.type.title4.fontSize,
      fontFamily: props.bold ? 'pretendard-bold' : 'pretendard-regular',
    },
  }),
);
