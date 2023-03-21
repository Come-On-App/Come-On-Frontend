import { createSlice } from '@reduxjs/toolkit';

export enum MeetingMode {
  edit = 'edit',
  create = 'create',
}
const initialState = {
  meetingId: 0,
  meetingData: {
    meetingName: '',
    calendarStartFrom: '',
    calendarEndTo: '',
  },
  meetingImgPath: null,
  totalMeetingMembers: 0,
  imgUri: '',
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
  totalMeetingMembers: number;
  imgUri: string;
  mode: MeetingMode;
}

const meetingSlice = createSlice({
  name: 'meeting',
  initialState: initialState as IMeeting,

  reducers: {
    setMeetingName: (state, action) => {
      state.meetingData.meetingName = action.payload;
    },
    setImgUri: (state, action) => {
      state.imgUri = action.payload;
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
    setTotalMeetingMembers: (state, action) => {
      state.totalMeetingMembers = action.payload;
    },
    setMeetingMode: (state, action) => {
      state.mode = action.payload;
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
      state.imgUri = '';
    },
  },
});

export const {
  setImgUri,
  setMeetingName,
  setCalendarStartFrom,
  setCalendarEndTo,
  setMeetingImgPath,
  setMeetingMode,
  setMeetingId,
  setTotalMeetingMembers,
  resetMeetingData,
} = meetingSlice.actions;

export default meetingSlice.reducer;
