import { setOnlineUserList } from '@features/socketSlice';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';

type OnlineUserListType = number[];
export type OnlineUserListDispatch = (payload: OnlineUserListType) => void;

export default function useSocketMeeting() {
  const dispatch = useAppDispatch();
  const meetingAppSelector = useAppSelector(state => state.meeting);
  const onlineUserList = useAppSelector(state => state.socket.onlineUserList);
  const onlineUserListDispatch = useCallback(
    (userList: OnlineUserListType) => {
      dispatch(setOnlineUserList(userList));
    },
    [dispatch],
  );

  return {
    onlineUserList,
    onlineUserListDispatch,
  };
}
