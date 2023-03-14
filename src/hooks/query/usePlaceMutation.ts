import {
  requestAddMeetingPlaces,
  requestDeleteMeetingPlaces,
  requestUpdateMeetingPlaces2,
} from '@api/meeting/places';
import { useMutation } from 'react-query';

const usePlaceMutation = () => {
  const { mutate: addMeetingPlace } = useMutation(requestAddMeetingPlaces);
  const { mutate: updateMeetingPlace } = useMutation(
    requestUpdateMeetingPlaces2,
  );
  const { mutate: deleteMeetingPlace } = useMutation(
    requestDeleteMeetingPlaces,
  );

  return {
    addMeetingPlace,
    updateMeetingPlace,
    deleteMeetingPlace,
  };
};

export default usePlaceMutation;
