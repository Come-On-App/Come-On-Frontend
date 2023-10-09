import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

export default makeStyles(() => {
  const [MODAL_PADDING, VOTE_ROBOT_CONTAINER_RIGHT] = applyRelativeSizes({
    padding: 10,
    voteGuideRobotContainerRight: 20,
  });

  return {
    modalContainer: {
      height: 'auto',
      padding: MODAL_PADDING,
      width: '90%',
    },
    voteGuideRobotContainer: {
      position: 'relative',
      right: VOTE_ROBOT_CONTAINER_RIGHT,
    },
  };
});
