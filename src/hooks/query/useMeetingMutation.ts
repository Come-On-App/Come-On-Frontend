import { requestDeleteMeeting } from '@api/meeting/members';

import { invalidateQueries, QueryKeys } from '@api/queryClient';
import { successAlert } from '@utils/alert';
import { useMutation } from 'react-query';

const useMeetingMutation = () => {
  const { mutate: deleteMeeting } = useMutation(requestDeleteMeeting, {
    onSuccess: () => {
      successAlert('모임 삭제 성공');
    },
    onSettled: () => {
      invalidateQueries([QueryKeys.meetings]);
    },
  });

  return { deleteMeeting };
};

export default useMeetingMutation;
