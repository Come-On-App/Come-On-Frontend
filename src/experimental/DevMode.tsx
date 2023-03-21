/* eslint-disable padding-line-between-statements */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input, SpeedDial, Switch } from '@rneui/themed';
import { ScrollView, View } from 'react-native';

import useAuth from '@hooks/useAuth';
import useUserQuery from '@hooks/query/useUserQuery';
import usePlace from '@hooks/redux/usePlace';
import { usePromiseFlow } from '@utils/promise';
import {
  requestCreateMeetings,
  requestGetEntryCode,
  requestGetMeetings,
} from '@api/meeting/meetings';
import {
  GetMeetingPayload,
  GetMeetingSliceResponse,
  PostMeetingPayload,
  PostMeetingResponse,
} from '@type/api.meeting';
import { serverAxios } from '@api/axiosInstance';
import { toast } from '@utils/alert';
import useMeetingQuery from '@hooks/query/useMeetingQuery';
import { requestDeleteMeeting } from '@api/meeting/members';
import { log } from '@utils/log';
import { setTokensToDB } from '@api/token/token';
import Modal from '../components/Modal';
import Button from '../components/button/Buttons';
import { BoldFont } from '../components/Font';

/**
 * 여러가지 테스트를 해볼수있는 환경입니다.
 *
 */

function DevScreen({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: React.ReactNode;
}) {
  return (
    <Modal
      isVisible={isVisible}
      style={{
        height: '80%',
        width: '90%',
        overflow: 'hidden',
      }}
    >
      <ScrollView snapToStart={false}>{children}</ScrollView>
    </Modal>
  );
}

function UserDevScreen({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const { setLogin, setTokens } = useAuth();
  const { user, refetch: userRefetch } = useUserQuery();
  const { refetch: meetingRetch } = useMeetingQuery();
  const [openLookUpMeeting, setOpenLookUpMeeting] = useState(true);
  const [state, setState] = useState({
    userIds: user?.userId || 0,
  });
  const [userList, setUserList] = useState([]);
  const closeModal = () => onClose(false);

  useEffect(() => {
    setState({ userIds: user?.userId || 0 });
  }, [user]);

  return (
    <DevScreen isVisible={isVisible}>
      <View style={{ minHeight: 1000 }}>
        <BoldFont style={{ fontSize: 18, paddingBottom: 5 }}>
          닉네임: {user?.nickname}
        </BoldFont>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <BoldFont style={{ fontSize: 18, paddingBottom: 5 }}>
            #유저 변경
          </BoldFont>
          <Switch
            value={openLookUpMeeting}
            onValueChange={value => setOpenLookUpMeeting(value)}
          />
        </View>
        {openLookUpMeeting && (
          <View
            style={{
              borderColor: 'balck',
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 30,
            }}
          >
            <BoldFont>현재 유저 아이디</BoldFont>
            <Input
              keyboardType="number-pad"
              value={`${state.userIds}`}
              onChangeText={text => {
                setState(prev => {
                  return { ...prev, userIds: Number(text) };
                });
              }}
            />
            <Button
              disabled={!state.userIds}
              text="유저 변경"
              onPress={async () => {
                const { data } = await serverAxios.post(
                  'http://211.204.19.184:8088/test-api/v1/tokens',
                  {
                    userIds: [state.userIds],
                    atkExpirationSec: 5,
                    rtkExpirationSec: 5,
                  },
                );

                const payload = data.result[0];

                const DateFormat = new Date(
                  payload.accessToken.expiry,
                ).toLocaleString();

                log('토큰 만료 기한:', payload);
                userRefetch();
                meetingRetch();
                await setTokens(payload);
                await setLogin();
              }}
            />
            <Button
              buttonStyle={{ backgroundColor: 'orange' }}
              text="유저 조회"
              onPress={async () => {
                const { data } = await serverAxios.get(
                  'http://211.204.19.184:8088/test-api/v1/users',
                );
                setUserList(data.userSimples);
              }}
            />
            <ScrollView
              style={{
                height: 400,
              }}
            >
              {userList.map(
                (contents: {
                  name: string;
                  userId: number;
                  nickname: string;
                }) => {
                  return (
                    <View
                      style={{
                        paddingVertical: 5,
                        borderColor: 'balck',
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 8,
                        marginBottom: 10,
                      }}
                      key={contents.userId}
                    >
                      <BoldFont>userId :{contents.userId}</BoldFont>
                      <BoldFont>nickname :{contents.nickname}</BoldFont>
                      <BoldFont>name :{contents.name}</BoldFont>
                    </View>
                  );
                },
              )}
            </ScrollView>
          </View>
        )}

        <Button text="닫기" onPress={closeModal} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <BoldFont>🥕</BoldFont>
      </View>
    </DevScreen>
  );
}

function MapDevScreen({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const closeModal = () => onClose(false);
  const { placeState, placeResetDispatch } = usePlace();

  if (!placeState) return null;

  return (
    <DevScreen isVisible={isVisible}>
      <View style={{ minHeight: 900 }}>
        <Button text="모임 상태 지우기" onPress={placeResetDispatch} />

        <Button text="닫기" onPress={closeModal} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <BoldFont>🥕</BoldFont>
      </View>
    </DevScreen>
  );
}

function MeetingDevScreen({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [openManualMeeting, setOpenManualMeeting] = useState(true);
  const [openLookUpMeeting, setOpenLookUpMeeting] = useState(true);
  const { user } = useUserQuery();
  const [state, setState] = useState({
    meetingName: '테스트 모임 #1',
    meetingImageUrl: user?.profileImageUrl || '',
    calendarStartFrom: '2023-02-14',
    calendarEndTo: '2023-02-15',
  });
  const closeModal = () => onClose(false);
  const {
    promiseFlow: pf1,
    isSuccess: isS1,
    data: postMeetingResponse,
  } = usePromiseFlow<PostMeetingPayload, PostMeetingResponse>();
  const {
    promiseFlow: pf2,
    isSuccess: isS2,
    data: meetingSliceResponse,
  } = usePromiseFlow<Partial<GetMeetingPayload>, GetMeetingSliceResponse>();

  useEffect(() => {
    if (user) {
      setState(prev => {
        return { ...prev, meetingImageUrl: user.profileImageUrl || '' };
      });
    }
  }, [user]);

  return (
    <DevScreen isVisible={isVisible}>
      <View style={{ minHeight: 900 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <BoldFont style={{ fontSize: 18, paddingBottom: 5 }}>
            #모임 등록
          </BoldFont>
          <Switch
            value={openManualMeeting}
            onValueChange={value => setOpenManualMeeting(value)}
          />
        </View>

        {openManualMeeting && (
          <View
            style={{
              borderColor: 'balck',
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 30,
            }}
          >
            <BoldFont>모임 이름</BoldFont>
            <Input
              value={state.meetingName}
              onChangeText={text => {
                setState(prev => {
                  return { ...prev, meetingName: text };
                });
              }}
            />

            <BoldFont>모임 썸네일 이미지 (기본값- 사용자 썸네일)</BoldFont>
            <Input
              value={state.meetingImageUrl}
              onChangeText={text => {
                setState(prev => {
                  return { ...prev, meetingImageUrl: text };
                });
              }}
            />

            <BoldFont>모임 시작 날짜(yyyy-MM-dd)</BoldFont>
            <Input
              value={state.calendarStartFrom}
              onChangeText={text => {
                setState(prev => {
                  return { ...prev, calendarStartFrom: text };
                });
              }}
            />

            <BoldFont>모임 종료 날짜(yyyy-MM-dd)</BoldFont>
            <Input
              value={state.calendarEndTo}
              onChangeText={text => {
                setState(prev => {
                  return { ...prev, calendarEndTo: text };
                });
              }}
            />

            {postMeetingResponse && isS1 && (
              <>
                <BoldFont>생성된 미팅 아이디</BoldFont>
                <Input value={`${postMeetingResponse.meetingId}`} disabled />
              </>
            )}

            <Button
              text="모임 생성"
              onPress={() =>
                pf1(state, [requestCreateMeetings], {
                  onSuccess: payload => {
                    log('테스트게시물 아이디', payload.meetingId);
                    requestGetEntryCode(payload.meetingId).then(code => {
                      log('입장 코드', code);
                    });
                  },
                })
              }
              buttonStyle={{ backgroundColor: 'orange' }}
            />
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <BoldFont style={{ fontSize: 18, paddingBottom: 5 }}>
            #모임 리스트 조회
          </BoldFont>
          <Switch
            value={openLookUpMeeting}
            onValueChange={value => setOpenLookUpMeeting(value)}
          />
        </View>

        {openLookUpMeeting && (
          <View
            style={{
              borderColor: 'balck',
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 30,
            }}
          >
            <Button
              text="모임 리스트 조회"
              onPress={() =>
                pf2({}, [requestGetMeetings], {
                  onSuccess: payload => {
                    log('모임 리스트 조회 응답값', payload);
                  },
                })
              }
              buttonStyle={{
                backgroundColor: 'powderblue',
              }}
              textStyle={{ fontSize: 15, color: 'black' }}
            />
            {meetingSliceResponse && (
              <View>
                <Button
                  buttonStyle={{
                    backgroundColor: 'red',
                  }}
                  text="모임 전체 삭제"
                  onPress={() => {
                    meetingSliceResponse.contents.map(contents => {
                      return requestDeleteMeeting(contents.meetingId).then(
                        res => log('성공', res),
                      );
                    });
                  }}
                />
                <BoldFont>
                  총 게시물 개수: {meetingSliceResponse.contentsCount}
                </BoldFont>
                <BoldFont style={{ fontSize: 18 }}>모임 리스트</BoldFont>
                <ScrollView
                  style={{
                    height: 400,
                  }}
                >
                  {meetingSliceResponse.contents.map(contents => {
                    return (
                      <View
                        style={{
                          paddingVertical: 5,
                          borderColor: 'balck',
                          borderWidth: 1,
                          padding: 10,
                          borderRadius: 8,
                          marginBottom: 10,
                        }}
                        key={contents.meetingId}
                      >
                        <BoldFont>모임-아이디:{contents.meetingId}</BoldFont>
                        <BoldFont>모임-이름:{contents.meetingName}</BoldFont>
                        <BoldFont>----</BoldFont>
                        <BoldFont>
                          방장-닉네임:{contents.hostUser.nickname}
                        </BoldFont>
                        <BoldFont>
                          방장-아이디 :{contents.hostUser.userId}
                        </BoldFont>
                        <BoldFont>
                          calendarStartFrom :{contents.calendarStartFrom}
                        </BoldFont>
                        <BoldFont>
                          calendarEndTo :{contents.calendarEndTo}
                        </BoldFont>
                        {contents.fixedDate && (
                          <View>
                            <BoldFont>
                              fixedDate-startFrom:
                              {contents.fixedDate.startFrom}
                            </BoldFont>
                            <BoldFont>
                              fixedDate-endTo: {contents.fixedDate.endTo}
                            </BoldFont>
                          </View>
                        )}

                        <BoldFont>
                          meetingStartTime :{contents.meetingStartTime}
                        </BoldFont>
                        <BoldFont>memberCount :{contents.memberCount}</BoldFont>
                        <BoldFont>
                          myMeetingRole :{contents.myMeetingRole}
                        </BoldFont>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        <Button text="닫기" onPress={closeModal} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <BoldFont>🥕</BoldFont>
      </View>
    </DevScreen>
  );
}

export function DevMode() {
  const [open, setOpen] = useState(false);
  const [openUserDev, setOpenUserDev] = useState(false);
  const [openMapDev, setOpenMapDev] = useState(false);
  const [openMeetingDev, setOpenMeetingDev] = useState(false);

  return (
    <>
      <UserDevScreen isVisible={openUserDev} onClose={setOpenUserDev} />
      <MapDevScreen isVisible={openMapDev} onClose={setOpenMapDev} />
      <MeetingDevScreen
        isVisible={openMeetingDev}
        onClose={setOpenMeetingDev}
      />
      <SpeedDial
        isOpen={open}
        icon={{ name: 'bug-report', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        style={{
          position: 'absolute',
          bottom: 0,
          paddingBottom: 50, // 80
        }}
        color="red"
      >
        <SpeedDial.Action
          icon={{ name: 'account-circle', color: '#fff' }}
          title="사용자 정보"
          onPress={() => setOpenUserDev(true)}
          color="red"
        />
        <SpeedDial.Action
          icon={{ name: 'map', color: '#fff' }}
          title="장소 정보"
          onPress={() => setOpenMapDev(true)}
          color="red"
        />
        <SpeedDial.Action
          icon={{ name: 'book-online', color: '#fff' }}
          title="모임 정보"
          onPress={() => setOpenMeetingDev(true)}
          color="red"
        />
      </SpeedDial>
    </>
  );
}

export default DevMode;
