import { useNavigation } from '@react-navigation/native';
import { requestGetMyInfo } from '@api/user/user';
import { useMemo, useEffect } from 'react';
import { requestMeetingMembers } from '@api/meeting/members';
import { invalidateQueries, QueryKeys } from '@api/queryClient';
import { IMessage } from '@stomp/stompjs';
import {
  GetMeetingMembersListResponse,
  GetMeetingMembersResponse,
} from '@type/api.meeting';
import {
  IMeeting,
  IMeetingIndividual,
  IMeetingPlaceLock,
  ISubscribeList,
} from '@type/hook.webSocket';
import { successAlert } from '@utils/alert';
import fn, { pickSafelyBy } from '@utils/fn';
import { log } from '@utils/log';
import { promiseFlow } from '@utils/promise';
import { GetMyInfoResponse } from '@type/api.user';
import { requestPostMeetingPlacesUnLock } from '@api/meeting/places';
import { PlaceLock } from '@features/placeLockSlice';
import {
  BottomTabScreenNavigation,
  RootNavigation,
  RootScreenParams,
} from '@type/navigation';
import { fallbackImage } from './query/useUserQuery';
import usePlace from './redux/usePlace';
import usePlaceLock, {
  PlaceLockDispatch,
  PlaceUnLockDispatch,
} from './redux/usePlaceLock';
import useWebSocket from './useWebSocket';
import useSocketMeeting, { OnlineUserListDispatch } from './useSocketMeeting';

export default function useSubscribe(meetingId: number) {
  const { placeResetDispatch } = usePlace();
  const { placeUnLockDispatch } = usePlaceLock();

  useSubscribeIndividual(meetingId);
  useSubscribePlace(meetingId);

  useEffect(() => {
    return () => {
      placeResetDispatch();
      placeUnLockDispatch();
    };
  }, [placeResetDispatch, placeUnLockDispatch]);
}

// 개인 구독
function useSubscribeIndividual(meetingId: number) {
  const { placeLockDispatch } = usePlaceLock();
  const { subscribeIndividual } = useWebSocket();
  const navigation = useNavigation<RootNavigation>();
  const onMessage = useMemo(
    () => onIndividualMessageFn(meetingId, [placeLockDispatch], navigation),
    [meetingId, navigation, placeLockDispatch],
  );

  useEffect(() => {
    const subIndividual = subscribeIndividual(meetingId, onMessage);

    return () => {
      if (!subIndividual) return;

      subIndividual.unsubscribe();
    };
  }, [meetingId, onMessage, subscribeIndividual]);
}

// 모임 구독
function useSubscribePlace(meetingId: number) {
  const { placeLockDispatch, placeUnLockDispatch } = usePlaceLock();
  const { onlineUserListDispatch } = useSocketMeeting();
  const { placeResetDispatch } = usePlace();
  const { subscribePlace } = useWebSocket();
  const onMessage = useMemo(
    () =>
      onPlaceMessageFn(meetingId, [
        placeLockDispatch,
        placeUnLockDispatch,
        onlineUserListDispatch,
      ]),
    [meetingId, placeLockDispatch, placeUnLockDispatch, onlineUserListDispatch],
  );

  useEffect(() => {
    const subPlace = subscribePlace(meetingId, onMessage);

    return () => {
      if (!subPlace) return;

      subPlace.unsubscribe();
    };
  }, [meetingId, onMessage, placeResetDispatch, subscribePlace]);
}

function onIndividualMessageFn(
  meetingId: number,
  dispatchs: [PlaceLockDispatch],
  navigation: RootNavigation,
) {
  const [placeLockDispatch] = dispatchs;

  return (message: IMessage) => {
    const messageBody: IMeeting = JSON.parse(message.body);

    log(`/user/queue/meetings/${meetingId} - message.body]`, messageBody);

    if (messageBody.messageType === 'LOCKED_MEETING_PLACE_LIST') {
      const { data } = messageBody as IMeetingIndividual;

      if (fn.isEmpty(data.lockedPlaces)) return;

      const [lockedPlace] = data.lockedPlaces;

      promiseFlow(requestGetMyInfo, [
        ({ userId }: GetMyInfoResponse) => {
          // 기존에 락을 건 유저가 현재 유저 아이디와 같은 경우 (비정상 경로)
          if (userId === lockedPlace.lockingUserId) {
            requestPostMeetingPlacesUnLock({
              meetingId,
              placeId: lockedPlace.meetingPlaceId,
            });

            return;
          }

          const payload = {
            data: {
              meetingId: data.meetingId,
              meetingPlaceId: lockedPlace.meetingPlaceId,
              userId: lockedPlace.lockingUserId,
            },
          };

          setCurrentLockUser(payload, placeLockDispatch);
        },
      ]);
    } else if (messageBody.messageType === 'DROPPED') {
      successAlert('모임에서 강퇴되었습니다...😥');
      navigation.reset({ routes: [{ name: 'Root' }] });
    }
  };
}

function onPlaceMessageFn(
  meetingId: number,
  dispatchs: [PlaceLockDispatch, PlaceUnLockDispatch, OnlineUserListDispatch],
) {
  const [placeLockDispatch, placeUnLockDispatch, onlineUserListDispatch] =
    dispatchs;

  return (message: IMessage) => {
    const messageBody: IMeeting = JSON.parse(message.body);

    log(`[/sub/meetings/${meetingId} - message.body]`, messageBody);

    if (messageBody.messageType === 'MEETING_SUBSCRIBE_USER_LIST') {
      const { data } = messageBody as ISubscribeList;

      onlineUserListDispatch(data.userIds);
    }

    if (messageBody.messageType === 'RESOURCE_UPDATED_EVENT') {
      switch (messageBody.data.meetingResourceType) {
        // 모임 장소 리스트 갱신 메시지
        case 'MEETING_PLACES':
          invalidateQueries([QueryKeys.place, meetingId]);
          successAlert('모임 장소 리스트 갱신됨');
          break;
        // 모임 장소 락 등록 메시지
        case 'MEETING_PLACE_LOCK':
          setCurrentLockUser(
            messageBody as IMeetingPlaceLock,
            placeLockDispatch,
          );
          break;
        // 모임 장소 락 해제 메시지
        case 'MEETING_PLACE_UNLOCK':
          placeUnLockDispatch();
          break;
        // 모임 투표
        case 'MEETING_VOTING':
          invalidateQueries([QueryKeys.voting, meetingId]);
          break;
        // 미팅 멤버 업데이트
        case 'MEETING_MEMBERS':
          invalidateQueries([
            QueryKeys.meetingDetail,
            QueryKeys.members,
            meetingId,
          ]);
          break;
        // 모임 시간 업데이트
        case 'MEETING_TIME':
          invalidateQueries([
            QueryKeys.meetingDetail,
            QueryKeys.time,
            meetingId,
          ]);
          successAlert('모임 시간이 변경되었습니다!');
          break;
        default:
          break;
      }
    }
  };
}

interface Props {
  data: {
    meetingId: number;
    meetingPlaceId: number;
    userId: number;
  };
}

function setCurrentLockUser(
  { data: messageBody }: Props,
  dispatch: PlaceLockDispatch,
) {
  const payload: PlaceLock = {
    meetingResourceType: 'MEETING_PLACE_LOCK',
    meetingId: messageBody.meetingId,
    meetingPlaceId: messageBody.meetingPlaceId,
    userId: messageBody.userId,
    lockUserImage: fallbackImage,
  };

  // @see [https://github.com/Come-On-App/Come-On-Frontend/issues/97]
  dispatch(payload);

  promiseFlow<number, GetMeetingMembersResponse>(
    messageBody.meetingId,
    [
      requestMeetingMembers,
      (info: GetMeetingMembersListResponse) => {
        const [currentLockUser] = info.contents.filter(
          item => item.userId === messageBody.userId,
        );

        return currentLockUser;
      },
    ],
    {
      onSuccess: user => {
        dispatch({
          ...payload,
          lockUserImage: pickSafelyBy(user, 'profileImageUrl', fallbackImage),
        });
      },
    },
  );
}
