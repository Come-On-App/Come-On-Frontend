import { useQuery } from 'react-query';

import { QueryKeys } from '@api/queryClient';
import { requestMeetingPlaces } from '@api/meeting/places';
import { ErrorMeetingResponse } from '@type/api.meeting';
import { errorAlert } from '@utils/alert';

function usePlaceQuery(meetingId: number) {
  const { data: places } = useQuery(
    [QueryKeys.place, meetingId],
    ({ signal }) => requestMeetingPlaces(meetingId, signal),
    {
      onError: (error: ErrorMeetingResponse) => {
        errorAlert(error.response.data.errorDescription);
      },
    },
  );

  return { places };
}

export default usePlaceQuery;
