import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [
    TITLE_FONT_SIZE,
    TITLE_LINE_HEIGHT,
    SUB_TITLE_ICON_SIZE,
    SUB_TITLE_FONT_SIZE,
    SUB_TITLE_LINE_HEIGHT,
    DIVIDER_MARGIN_HORIZONTAL,
    DIVIDER_HEIGHT,
  ] = applyRelativeSizes({
    titleFontSize: theme.font.type.title3.fontSize,
    titleLineHeight: theme.font.type.title3.lineHeight,
    subTitleIconSize: 16,
    subTitleFontSize: theme.font.type.body2.fontSize,
    subTitleLineHeight: theme.font.type.body2.lineHeight,
    dividerMarginHorizontal: 5,
    dividerHeight: 12,
  });

  return {
    titleFont: {
      color: theme.font.grayscale['900'],
      fontSize: TITLE_FONT_SIZE,
      lineHeight: TITLE_LINE_HEIGHT,
    },
    cSubTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    subTitleIcon: {
      color: theme.font.grayscale['600'],
      size: SUB_TITLE_ICON_SIZE,
    },
    subTitleFont: {
      color: theme.font.grayscale['600'],
      fontSize: SUB_TITLE_FONT_SIZE,
      lineHeight: SUB_TITLE_LINE_HEIGHT,
    },
    divider: {
      marginHorizontal: DIVIDER_MARGIN_HORIZONTAL,
      height: DIVIDER_HEIGHT,
      color: theme.font.grayscale['300'],
      width: 1,
    },
    dividerBorder: {
      color: theme.font.grayscale['300'],
      width: 1,
    },
  };
});
