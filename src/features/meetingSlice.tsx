import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meetingData: {
    meetingName: '',
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
  meetingId: number;
  meetingData: {
    meetingName: string;
    calendarStartFrom: string;
    calendarEndTo: string;
  };
  meetingImgPath: AssetState | null;
}

const meetingSlice = createSlice({
  name: 'meeting',
  initialState: initialState as IMeeting,

  reducers: {
    setMeetingName: (state, action) => {
      state.meetingData.meetingName = action.payload;
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
    setMeetingId: (state, action) => {
      state.meetingId = action.payload;
    },

    resetMeetingData: state => {
      const newData = {
        meetingName: '',
        calendarStartFrom: '',
        calendarEndTo: '',
      };

      if (
        state.meetingData.meetingName &&
        state.meetingData.calendarStartFrom &&
        state.meetingData.calendarEndTo
      ) {
        state.meetingData = newData;
      }

      state.meetingImgPath = null;
    },
  },
});

export const {
  setMeetingName,
  setCalendarStartFrom,
  setCalendarEndTo,
  setMeetingImgPath,
  setMeetingId,
  resetMeetingData,
} = meetingSlice.actions;

export default meetingSlice.reducer;
