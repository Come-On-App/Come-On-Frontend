import { createSlice } from '@reduxjs/toolkit';

interface ISocket {
  message: {
    messageType: string;
    data: object;
  };
  votingUpdate: boolean;
  meetingUpdate: boolean;
  memberUpdate: boolean;
  onlineUserUpdate: boolean;
  onlineUserList: number[];
}

const initialState = {
  message: {
    messageType: '',
    data: {},
  },
  votingUpdate: false,
  meetingUpdate: false,
  onlineUserUpdate: false,
  memberUpdate: false,
  onlineUserList: [],
};
const socketSlice = createSlice({
  name: 'socket',
  initialState: initialState as unknown as ISocket,
  reducers: {
    onMessage: (state, action) => {
      const message = action.payload;
      const { messageType, data } = message;

      console.log(messageType, data);

      if (messageType !== 'RESOURCE_UPDATED_EVENT') {
        state.onlineUserUpdate = true;
        state.memberUpdate = true;
        state.onlineUserList = data.userIds;

        return;
      }

      if (messageType === 'RESOURCE_UPDATED_EVENT')
        switch (data.meetingResourceType) {
          case 'MEETING_VOTING':
            state.votingUpdate = true;
            break;
          case 'SUBSCRIBE_MEETING_EVENT':
            state.meetingUpdate = true;
            break;
          case 'UNSUBSCRIBE_MEETING_EVENT':
            state.meetingUpdate = true;
            break;

          case 'MEETING_MEMBERS':
            state.memberUpdate = true;
            break;

          default:
            break;
        }
    },
    setVotingUpdateEnd: state => {
      state.votingUpdate = false;
    },
    setMeetingUpdateEnd: state => {
      state.meetingUpdate = false;
    },
    setMemberUpdateEnd: state => {
      state.memberUpdate = false;
    },
    setOnlineUserUpdateEnd: state => {
      state.onlineUserUpdate = false;
    },
  },
});

export const {
  onMessage,
  setVotingUpdateEnd,
  setMeetingUpdateEnd,
  setMemberUpdateEnd,
  setOnlineUserUpdateEnd,
} = socketSlice.actions;

export default socketSlice.reducer;
