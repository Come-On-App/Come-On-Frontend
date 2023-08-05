import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [
    CONTAINER_MENU_ITEM_HEIGHT,
    CONTAINER_MENU_ITEM_MIN_HEIGHT,
    CONTAINER_MENU_ITEM_MAX_WIDTH,
    CONTAINER_MENU_ITEM_PADDING_HORIZONTAL,
    MENU_DEFAULT_FONT_SIZE,
  ] = applyRelativeSizes({
    containerMenuItemHeight: 48,
    containerMenuItemMinHeight: 123,
    containerMenuItemMaxWidth: 248,
    containerMenuItemPaddingHorizontal: 5,
    menuDefaultFontSize: theme.font.type.body1.fontSize,
  });

  return {
    cMenuItem: {
      height: CONTAINER_MENU_ITEM_HEIGHT,
      minWidth: CONTAINER_MENU_ITEM_MIN_HEIGHT,
      maxWidth: CONTAINER_MENU_ITEM_MAX_WIDTH,
      paddingHorizontal: CONTAINER_MENU_ITEM_PADDING_HORIZONTAL,
    },
    menuDefaultFont: {
      fontSize: MENU_DEFAULT_FONT_SIZE,
    },
  };
});
