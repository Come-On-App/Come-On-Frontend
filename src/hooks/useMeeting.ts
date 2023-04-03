import { useCallback, useMemo } from 'react';
import {
  setMeetingMode as setMyMeetingMode,
  MeetingMode,
  setCalendarEndTo,
  setCalendarStartFrom,
  setMeetingName,
  setTotalMeetingMembers,
} from '@features/meetingSlice';
import { AssetState } from '@type/hook.imagePicker';
import { PatchMeetingPayload } from '@type/api.meeting';
import { Calendar } from '@type/meeting.date';
import {
  setMeetingId,
  setMeetingImgPath,
  resetMeetingData as reset,
  setImgUri as setImgURI,
} from '../features/meetingSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

export const useCreatePayload = (): {
  createMeetingPayload: AssetState | null;
  editMeetingPayload: PatchMeetingPayload;
} => {
  const { meetingSelector } = useMeeting();
  const { meetingId, meetingImgPath, meetingData, imgUri } = meetingSelector;
  const { meetingName, calendarStartFrom, calendarEndTo } = meetingData;
  const createMeetingPayload = meetingImgPath;
  const editMeetingPayload = {
    meetingId,
    meetingData: {
      meetingName,
      meetingImageUrl: imgUri,
      calendarStartFrom,
      calendarEndTo,
    },
  };

  return { createMeetingPayload, editMeetingPayload };
};

export const getPayloadByMeetingMode = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const payload = useCreatePayload();

  return { payload };
};

function useMeeting() {
  const dispatch = useAppDispatch();
  const meetingSelector = useAppSelector(state => state.meeting);
  const totalMemberCounts = meetingSelector.totalMeetingMembers;
  const setCurrentMeetingId = (meetId: number) => {
    dispatch(setMeetingId(meetId));
  };
  const calendarData: Calendar = useMemo(() => {
    return {
      startFrom: meetingSelector.meetingData.calendarStartFrom,
      endTo: meetingSelector.meetingData.calendarEndTo,
    };
  }, [
    meetingSelector.meetingData.calendarEndTo,
    meetingSelector.meetingData.calendarStartFrom,
  ]);
  const resetMeetingData = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);
  const setMyMeetingName = (text: string) => {
    dispatch(setMeetingName(text));
  };
  const setMeetingMode = useCallback(
    (mode: MeetingMode) => {
      dispatch(setMyMeetingMode(mode));
    },
    [dispatch],
  );
  const setMyMeetingImgPath = useCallback(
    (path: AssetState) => {
      dispatch(setMeetingImgPath(path));
    },
    [dispatch],
  );
  const setTotalMemberCounts = useCallback(
    (memberCount: number) => {
      dispatch(setTotalMeetingMembers(memberCount));
    },
    [dispatch],
  );
  const setImgUri = useCallback(
    (uri: string) => {
      dispatch(setImgURI(uri));
    },
    [dispatch],
  );
  const setCalendarDate = useCallback(
    (date: { startDate: string; endDate: string }) => {
      dispatch(setCalendarStartFrom(date.startDate));
      dispatch(setCalendarEndTo(date.endDate));
    },
    [dispatch],
  );

  return {
    meetingSelector,
    totalMemberCounts,
    setCurrentMeetingId,
    setImgUri,
    setMeetingMode,
    setCalendarDate,
    setTotalMemberCounts,
    setMyMeetingImgPath,
    setMyMeetingName,
    resetMeetingData,
    calendarData,
  };
}

export default useMeeting;
