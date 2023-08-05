import { makeStyles } from '@rneui/themed';
import { applyRelativeSizes } from '@shared/utils';

const [MESSAGE_CONTAINER_MARGIN_TOP, MESSAGE_CONTAINER_BOTTOM] =
  applyRelativeSizes({
    marginTop: 4,
    marginBottom: 16,
  });

export default makeStyles(() => ({
  userContainer: {
    alignItems: 'center',
  },
  msgContainer: {
    alignItems: 'center',
    marginTop: MESSAGE_CONTAINER_MARGIN_TOP,
    marginBottom: MESSAGE_CONTAINER_BOTTOM,
  },
  cAccountManagement: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));
