import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [DROPDOWN_HEIGHT, DROPDOWN_PADDING, DROPDOWN_ITEM_FONTSIZE] =
    applyRelativeSizes({
      dropdownHeight: 44,
      dropdownPadding: 12,
      dropdwonItemFontSize: theme.font.type.body3.fontSize,
    });

  return {
    dropdown: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: theme.font.grayscale['200'],
      height: DROPDOWN_HEIGHT,
      padding: DROPDOWN_PADDING,
    },
    dropdwonSelectedText: {
      fontSize: DROPDOWN_ITEM_FONTSIZE,
      color: theme.font.grayscale['900'],
    },
    dropdwonPlaceholder: {
      fontSize: DROPDOWN_ITEM_FONTSIZE,
      color: theme.font.grayscale['900'],
    },
    dropdwonContainer: {
      borderRadius: 4,
      borderColor: theme.font.grayscale['200'],
    },
    dropdwonItemText: {
      color: theme.font.grayscale['900'],
      fontSize: DROPDOWN_ITEM_FONTSIZE,
    },
  };
});
