import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';
import _ from 'lodash';

export default makeStyles(
  (theme, { size, path }: { size: number; path: string | undefined }) => {
    const [BORDER_RADIUS] = applyRelativeSizes({
      borderRadius: 20,
    });

    return {
      defaultStyle: {
        width: size,
        height: size,
        borderRadius: BORDER_RADIUS,
        backgroundColor: _.isEmpty(path)
          ? theme.font.grayscale['100']
          : undefined,
      },
      badgeColor: {
        color: theme.font.grayscale['500'],
      },
      defaultBadgeStyle: {
        backgroundColor: theme.font.grayscale['100'],
        elevation: 0,
        borderWidth: 0,
        shadowOpacity: 0,
      },
    };
  },
);
