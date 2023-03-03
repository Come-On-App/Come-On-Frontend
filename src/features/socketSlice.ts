import { createSlice } from '@reduxjs/toolkit';

interface ISocket {
  message: {
    messageType: string;
    data: object;
  };
  votingUpdate: boolean;
}

const initialState = {
  message: {
    messageType: '',
    data: {},
  },
  votingUpdate: false,
};
const socketSlice = createSlice({
  name: 'socket',
  initialState: initialState as ISocket,
  reducers: {
    onMessage: (state, action) => {
      const message = action.payload;
      const { meetingResourceType } = message;

      console.log('111111111111');
      console.log(meetingResourceType);
      switch (meetingResourceType) {
        case 'MEETING_VOTING':
          state.votingUpdate = true;
          break;

        default:
          break;
      }
    },
    setVotingUpdateEnd: state => {
      state.votingUpdate = false;
    },
  },
});

export const { onMessage, setVotingUpdateEnd } = socketSlice.actions;

export default socketSlice.reducer;
