import { createSlice } from '@reduxjs/toolkit';

interface ISocket {
  message: {
    messageType: string;
    data: object;
  };

  onlineUserList: number[];
}

const initialState = {
  message: {
    messageType: '',
    data: {},
  },

  onlineUserList: [],
};
const socketSlice = createSlice({
  name: 'socket',
  initialState: initialState as unknown as ISocket,
  reducers: {
    setOnlineUserList: (state, action) => {
      state.onlineUserList = action.payload;
    },
  },
});

export const { setOnlineUserList } = socketSlice.actions;

export default socketSlice.reducer;
