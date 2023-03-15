import { useCallback } from 'react';
import { setMeetingName } from '@features/meetingSlice';
import { AssetState } from '@type/hook.imagePicker';
import {
  setMeetingId,
  setMeetingImgPath,
  resetMeetingData as reset,
} from '../features/meetingSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function useMeeting() {
  const dispatch = useAppDispatch();
  const meetingId = useAppSelector(state => state.meeting.meetingId);
  const meetingImgPath = useAppSelector(state => state.meeting.meetingImgPath);
  const meetingData = useAppSelector(state => state.meeting.meetingData);
  const setCurrentMeetingId = (meetId: number) => {
    dispatch(setMeetingId(meetId));
  };
  const resetMeetingData = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);
  const setMyMeetingName = (text: string) => {
    dispatch(setMeetingName(text));
  };
  const setMyMeetingImgPath = (path: AssetState) => {
    dispatch(setMeetingImgPath(path));
  };

  return {
    meetingId,
    meetingData,
    meetingImgPath,
    setCurrentMeetingId,
    setMyMeetingImgPath,
    setMyMeetingName,
    resetMeetingData,
  };
}

export default useMeeting;
