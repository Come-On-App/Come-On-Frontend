import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  setOnlineUserUpdateEnd,
  onMessage as onMessageRdx,
} from '@features/socketSlice';
import { GetSocketResponse } from '@type/meeting.socket';

export default function useSocketMeeting() {
  const dispatch = useAppDispatch();
  const ONLINE_UPDATE = useAppSelector(state => state.socket.onlineUserUpdate);
  const MEMBER_UPDATE = useAppSelector(state => state.socket.memberUpdate);
  const onlineUserList = useAppSelector(state => state.socket.onlineUserList);
  const MEETING_UPDATE = useAppSelector(state => state.socket.meetingUpdate);
  const totalMemberCounts = useAppSelector(
    state => state.meeting.totalMeetingMembers,
  );
  const onlineUserUpdateEnd = () => dispatch(setOnlineUserUpdateEnd());
  const onMessage = (data: GetSocketResponse) => {
    dispatch(onMessageRdx(data));
  };

  return {
    ONLINE_UPDATE,
    MEMBER_UPDATE,
    MEETING_UPDATE,
    onMessage,
    onlineUserList,
    totalMemberCounts,
    onlineUserUpdateEnd,
  };
}
