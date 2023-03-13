import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setOnlineUserUpdateEnd } from '@features/socketSlice';

export default function useSocketMeeting() {
  const dispatch = useAppDispatch();
  const ONLINE_UPDATE = useAppSelector(state => state.socket.onlineUserUpdate);
  const MEMBER_UPDATE = useAppSelector(state => state.socket.memberUpdate);
  const onlineUserList = useAppSelector(state => state.socket.onlineUserList);
  const totalMemberCounts = useAppSelector(
    state => state.meeting.totalMeetingMembers,
  );
  const onlineUserUpdateEnd = () => dispatch(setOnlineUserUpdateEnd());

  return {
    ONLINE_UPDATE,
    MEMBER_UPDATE,
    onlineUserList,
    totalMemberCounts,
    onlineUserUpdateEnd,
  };
}
