/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meetingData: {
    meetingName: '',
    meetingImageUrl: '',
    calendarStartFrom: '',
    calendarEndTo: '',
  },
  meetingImgPath: {},
};

interface FormDataBody {
  name: string;
  type: string;
  uri: string;
}

interface AssetState extends FormDataBody {
  assetId: string | null | undefined;
}
interface IMeeting {
  meetingData: {
    meetingName: string;
    meetingImageUrl: string;
    calendarStartFrom: string;
    calendarEndTo: string;
  };
  meetingImgPath: AssetState;
}

const meetingSlice = createSlice({
  name: 'meeting',
  initialState: initialState as IMeeting,
  reducers: {
    setMeetingName: (state, action) => {
      state.meetingData.meetingName = action.payload;
    },
    setMeetingImageUrl: (state, action) => {
      console.log(action.payload);
      state.meetingData.meetingImageUrl = action.payload;
    },
    setMeetingImgPath: (state, action) => {
      state.meetingImgPath = action.payload;
    },
    setCalendarStartFrom: (state, action) => {
      state.meetingData.calendarStartFrom = action.payload;
    },
    setCalendarEndTo: (state, action) => {
      state.meetingData.calendarEndTo = action.payload;
    },
  },
});

export const {
  setMeetingName,
  setMeetingImageUrl,
  setCalendarStartFrom,
  setCalendarEndTo,
  setMeetingImgPath,
} = meetingSlice.actions;

export default meetingSlice.reducer;
