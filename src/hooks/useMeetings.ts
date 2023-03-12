import { useCallback } from 'react';
import {
  setMeetingId,
  resetMeetingData as reset,
} from '../features/meetingSlice';
import { useAppSelector, useAppDispatch } from './redux/hooks';

function useMeetings() {
  const dispatch = useAppDispatch();
  const meetingId = useAppSelector(state => state.meeting.meetingId);
  const meetingData = useAppSelector(state => state.meeting.meetingData);
  const setCurrentMeetingId = (meetId: number) => {
    dispatch(setMeetingId(meetId));
  };
  const resetMeetingData = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    meetingId,
    meetingData,
    setCurrentMeetingId,
    resetMeetingData,
  };
}

export default useMeetings;
