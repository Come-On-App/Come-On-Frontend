import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles(
  (
    theme,
    props: {
      bold?: boolean;
      backgroundColor?: string;
      leftButtonColor?: string;
      rightButtonColor?: string;
    },
  ) => {
    const [
      BUTTON_HEIGHT,
      FONT_SIZE,
      BORDER_RADIUS,
      LOGIN_BUTTON_ICON_SIZE,
      LOGIN_BUTTON_FONT_SIZE,
      CONTAINER_WIDTH,
      CONTAINER_HEIGHT,
      CONTAINER_BORDER_RADIUS,
      CONTAINER_PADDING_HORIZONTAL,
      CONTAINER_PADDING_MARGIN_TOP,
      CONTAINER_BUTTON_WIDHT,
      BUTTON_ICON_SIZE,
    ] = applyRelativeSizes({
      buttonHeight: 48,
      fontSzie: theme.font.type.title4.fontSize,
      borderRadius: 4,
      iconSize: 25,
      fontSize: theme.font.type.title4.fontSize,
      containerWidth: 335,
      containerHeight: 56,
      containerBorderRadius: 8,
      containerPaddingHorizontal: 23,
      marginTop: 16,
      addButtonContainerButtonWidth: 44,
      addButtonIconSize: 24,
    });

    return {
      defaultStyle: {
        height: BUTTON_HEIGHT,
        borderRadius: BORDER_RADIUS,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : theme.colors.primary,
      },
      font: {
        color: theme.font.grayscale['0'],
        fontSize: FONT_SIZE,
        fontFamily: props.bold ? 'Pretendard-SemiBold' : 'Pretendard-Medium',
      },
      loginIcon: {
        width: LOGIN_BUTTON_ICON_SIZE,
        height: LOGIN_BUTTON_ICON_SIZE,
      },
      loginFont: {
        color: theme.font.grayscale[0],
        fontSize: LOGIN_BUTTON_FONT_SIZE,
      },
      loginButtonContainer: {
        marginTop: CONTAINER_PADDING_MARGIN_TOP,
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        backgroundColor: theme.colors.primary,
        borderRadius: CONTAINER_BORDER_RADIUS,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
      },
      loginButtonPressed: {
        opacity: 0.7,
      },
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
      addButtonContainer: {
        width: CONTAINER_BUTTON_WIDHT,
        alignItems: 'center',
      },
      addButtonIcon: {
        size: BUTTON_ICON_SIZE,
        color: '#231F20',
      },
    };
  },
);
