import { requestDeleteMeeting } from '@api/meeting/members';

import { invalidateQueries, QueryKeys } from '@api/queryClient';
import { successAlert } from '@utils/alert';
import { useMutation } from 'react-query';

const text = '모임이 성공적으로 삭제되었습니다.';
const useMeetingMutation = (successMessage: string = text) => {
  const { mutate: deleteMeeting } = useMutation(requestDeleteMeeting, {
    onSuccess: () => {
      successAlert(successMessage);
    },
    onSettled: () => {
      invalidateQueries([QueryKeys.meetings]);
    },
  });

  return { deleteMeeting };
};

export default useMeetingMutation;
