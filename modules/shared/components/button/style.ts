import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles(
  (theme, props: { bold?: boolean; backgroundColor?: string }) => {
    const [BUTTON_HEIGHT, FONT_SIZE] = applyRelativeSizes({
      buttonHeight: 48,
      fontSzie: theme.font.type.title4.fontSize,
    });

    return {
      defaultStyle: {
        height: BUTTON_HEIGHT,
        borderRadius: 4,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : theme.colors.primary,
      },
      font: {
        color: theme.font.grayscale['0'],
        fontSize: FONT_SIZE,
        fontFamily: props.bold ? 'Pretendard-SemiBold' : 'Pretendard-Medium',
      },
    };
  },
);
