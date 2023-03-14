import React, { useEffect, useState } from 'react';
import Font, { BoldFont } from '@components/Font';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import Button from '@components/buttons/Buttons';
import { CalenderClickEventType } from '@type/index';
import { requestGetDateVotingDetails } from '@api/meeting/voting';
import { GetDateVotingDetailsResponse, VotingUsers } from '@type/api.meeting';
import Avatar from '@components/member/Avatar';
import { requestConfirmMeetingDate } from '@api/meeting/confirm';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import useAuth from '@hooks/useAuth';
import useSocketMeeting from '@hooks/useSocketMeeting';
import LoadingComponent from './LoadingComponent';

function returnDotDate(date: CalenderClickEventType) {
  const { year, month, day } = date;
  const strMonth = month < 10 ? `0${month}` : String(month);
  const title = `${year}.${strMonth}.${day}`;

  return title;
}

function returnDayStr(timeStamp: number) {
  const d = new Date(timeStamp + 1000);
  const dayStr = d.toString().slice(0, 3).toLocaleUpperCase();

  return dayStr;
}

export default function DateModal({
  date,
  hostId,
}: {
  date: CalenderClickEventType;
  hostId: number;
}) {
  const meetingId = 130;
  const styles = useStyles();
  const userId = useAuth().myId;
  const title = returnDotDate(date);
  const dayStr = returnDayStr(date.timestamp);
  const isHost = userId === hostId;
  const { totalMemberCounts } = useSocketMeeting();
  const [dateDetails, setDateDetails] =
    useState<GetDateVotingDetailsResponse>();
  const onClickHandler = () => {
    const payload = {
      meetingDateStartFrom: date.dateString,
      meetingDateEndTo: date.dateString,
    };

    requestConfirmMeetingDate({ meetingId, payload }).then(res => {
      if (res.success) Toast.show({ text1: '모임일이 확정되었습니다.' });
    });
  };

  // 해당 요일을 누른 유저의 정보 받아오기
  useEffect(() => {
    async function fetchDateVotingDetails() {
      const payload = { date: date.dateString };
      const data = await requestGetDateVotingDetails({
        meetingId,
        payload,
      });

      setDateDetails(data);
    }

    fetchDateVotingDetails();
  }, [date.dateString]);

  return (
    <View style={styles.overlayView}>
      <ModalTop title={title} date={dayStr} />
      <View style={styles.overlayViewMiddle}>
        {dateDetails ? (
          <ModalMiddleWithAvata votingUsers={dateDetails.votingUsers} />
        ) : (
          <LoadingComponent />
        )}
      </View>
      <View style={styles.overlayLine} />
      <View style={styles.overlayViewBottom}>
        {dateDetails && (
          <ModalBottomTotalLabel
            memberCount={dateDetails.memberCount}
            totalMemberCount={totalMemberCounts}
          />
        )}
        {isHost && <ConfirmDateButton onClickHandler={onClickHandler} />}
      </View>
    </View>
  );
}

function ModalTop({ title, date }: { title: string; date: string }) {
  const styles = useStyles();

  return (
    <View style={styles.overlayViewTop}>
      <BoldFont style={styles.overlayTitle}>
        {title}({date})
      </BoldFont>
    </View>
  );
}

function ModalMiddleWithAvata({ votingUsers }: { votingUsers: VotingUsers[] }) {
  const styles = useStyles();

  return (
    <View style={styles.middleAvatarAndNameView}>
      {votingUsers.map(user => (
        <AvatarAndName key={user.userId} user={user} />
      ))}
    </View>
  );
}

function ModalBottomTotalLabel({
  memberCount,
  totalMemberCount,
}: {
  memberCount: number;
  totalMemberCount: number;
}) {
  const styles = useStyles();

  return (
    <Font style={styles.overlayBottomText}>
      가능 인원 : <Font style={styles.primaryColor}>{memberCount}</Font> /{' '}
      {totalMemberCount}
    </Font>
  );
}

function ConfirmDateButton({ onClickHandler }: { onClickHandler: () => void }) {
  return (
    <View>
      <Button text="모임일로 확정하기" onPress={onClickHandler} />
    </View>
  );
}

function AvatarAndName({ user }: { user: VotingUsers }) {
  const { nickname, profileImageUrl } = user;
  const styles = useStyles();

  return (
    <>
      <Avatar
        size={28}
        path={profileImageUrl}
        containerStyle={styles.AvatarAndName}
      />
      <Font>{nickname}</Font>
    </>
  );
}

export function NoUserModal({ date }: { date: CalenderClickEventType }) {
  const styles = useStyles();
  const title = returnDotDate(date);
  const dayStr = returnDayStr(date.timestamp);

  return (
    <View style={styles.overlayView}>
      <View style={styles.overlayViewTop}>
        <BoldFont style={styles.overlayTitle}>
          {title}({dayStr})
        </BoldFont>
      </View>
      <View style={styles.overlayViewMiddle}>
        <Font>가능한 인원이 없습니다.</Font>
      </View>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  overlayView: {
    width: 280,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlayViewTop: {
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 10,

    backgroundColor: theme.grayscale[100],
  },
  overlayViewMiddle: {
    width: '100%',
    alignItems: 'center',
    margin: 0,
    paddingVertical: 24,
    paddingHorizontal: 10,
  },
  middleAvatarAndNameView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleFontStyle: {
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
  },
  overlayLine: {
    backgroundColor: theme.grayscale[200],
    height: 1,
    width: '100%',
  },
  overlayViewBottom: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 18,
  },
  overlayTitle: {
    color: theme.grayscale[700],
    lineHeight: theme.textStyles.title4.lineHeight,
    fontSize: theme.textStyles.title4.fontSize,
  },
  overlayBottomText: {
    color: theme.grayscale[900],
    lineHeight: theme.textStyles.body1.lineHeight,
    fontSize: theme.textStyles.body1.fontSize,
    marginBottom: 16,
  },
  primaryColor: {
    color: theme.colors.primary,
    lineHeight: theme.textStyles.body1.lineHeight,
    fontSize: theme.textStyles.body1.fontSize,
  },
  AvatarAndName: { marginRight: 4 },
}));
