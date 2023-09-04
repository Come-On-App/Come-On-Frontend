import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles((theme) => {
  const [VIEW_HEIGHT, VIEW_MARGIN_BOTTOM, AVATAR_MARGIN_RIGHT] =
    applyRelativeSizes({
      viewHeight: 50,
      viewMarginBottom: 10,
      avatarMarginRight: 5,
    });

  return {
    viewContainer: {
      height: VIEW_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: VIEW_MARGIN_BOTTOM,
      width: '48%',
    },
    avatarStyle: {
      marginRight: AVATAR_MARGIN_RIGHT,
    },
    nicknameContainer: {
      flex: 1,
    },
    scrollViewOuterContainer: {
      width: '100%',
      height: '100%', // 부모 컴포넌트 높이 위임
    },
    scrollViewContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicatorStyle: {
      color: theme.colors.primary,
    },
  };
});
