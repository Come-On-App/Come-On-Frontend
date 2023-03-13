import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  setOnlineUserUpdateEnd,
  onMessage as onMessageRdx,
} from '@features/socketSlice';
import { GetSocketResponse } from '@type/meeting.socket';

export default function useSocketMeeting() {
  const dispatch = useAppDispatch();
  const socketAppSelector = useAppSelector(state => state.socket);
  const meetingAppSelector = useAppSelector(state => state.meeting);
  const ONLINE_UPDATE = socketAppSelector.onlineUserUpdate;
  const MEMBER_UPDATE = socketAppSelector.memberUpdate;
  const { onlineUserList } = socketAppSelector;
  const MEETING_UPDATE = socketAppSelector.meetingUpdate;
  const totalMemberCounts = meetingAppSelector.totalMeetingMembers;
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
