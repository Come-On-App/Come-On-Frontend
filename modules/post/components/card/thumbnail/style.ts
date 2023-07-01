import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils/utils';

export default makeStyles(() => {
  const [IMAGE_HEIGHT, IMAGE_MARGIN_BOTTOM, IMAGE_BORDER_RADIUS] =
    applyRelativeSizes({
      imageHeight: 200,
      imageMarginBottom: 8,
      imageBorderRadius: 8,
    });

  return {
    ImageContianer: {
      borderRadius: IMAGE_BORDER_RADIUS,
      height: IMAGE_HEIGHT,
      marginBottom: IMAGE_MARGIN_BOTTOM,
    },
  };
});
