import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes, relativeSizeConverter } from '@shared/utils';

export default makeStyles((theme) => {
  const [
    IMAGE_HEIGHT,
    IMAGE_BORDER_RADIUS,
    TITLE_LINE_HEIGHT,
    SUB_TITLE_LINE_HEIGHT,
    CONTAINER_CARD_HEIGHT,
    CONTAINER_CARD_MARGIN_BOTTOM,
    SPACING,
    IMAGE_CONTAINDER_MARGIN_VERTICAL,
  ] = applyRelativeSizes({
    imageHeight: 200,
    imageBorderRadius: 8,
    titleLineHeight: theme.font.type.title3.lineHeight,
    subTitleLineHeight: theme.font.type.body2.lineHeight,
    containerCardHeight: 255,
    containerCardMarginBottom: 5,
    titleSpacing: 5,
    imageContainerMarginVertical: 5,
  });

  return {
    cCard: {
      height: CONTAINER_CARD_HEIGHT,
      marginBottom: CONTAINER_CARD_MARGIN_BOTTOM,
      margin: 15,
    },
    thumbnail: {
      borderRadius: IMAGE_BORDER_RADIUS,
      height: IMAGE_HEIGHT,
      marginVertical: IMAGE_CONTAINDER_MARGIN_VERTICAL,
    },
    title: {
      height: TITLE_LINE_HEIGHT,
      borderRadius: IMAGE_BORDER_RADIUS,
      width: relativeSizeConverter(130),
    },
    subTitle: {
      marginTop: SPACING,
      marginRight: SPACING,
      borderRadius: IMAGE_BORDER_RADIUS,
      height: SUB_TITLE_LINE_HEIGHT,
    },
    subTitleNickNameWidth: {
      width: relativeSizeConverter(100),
    },
    subTitleDateWidth: {
      width: relativeSizeConverter(200),
    },
  };
});
