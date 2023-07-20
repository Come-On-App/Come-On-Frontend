import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [
    IMAGE_CONTAINER_HEIGHT,
    IMAGE_CONTAINER_BORDER_RADIUS,
    IMAGE_CONTAINDER_MARGIN_VERTICAL,
    FONT_SIZE,
    ICON_SIZE,
  ] = applyRelativeSizes({
    imageContainerHeight: 200,
    imageContainerBorderRadius: 8,
    imageContainerMarginVertical: 5,
    fontSize: theme.font.type.body1.fontSize,
    iconSize: 28,
  });

  return {
    imageContainer: {
      height: IMAGE_CONTAINER_HEIGHT,
      borderRadius: IMAGE_CONTAINER_BORDER_RADIUS,
      marginVertical: IMAGE_CONTAINDER_MARGIN_VERTICAL,
    },
    imageUploader: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.font.grayscale['100'],
    },
    font: {
      color: theme.font.grayscale['500'],
      fontSize: FONT_SIZE,
    },
    icon: {
      color: theme.font.grayscale['500'],
      size: ICON_SIZE,
    },
  };
});
