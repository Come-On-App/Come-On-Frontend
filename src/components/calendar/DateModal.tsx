import React, { useId } from 'react';
import Font, { BoldFont } from '@components/Font';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { makeStyles } from '@rneui/themed';
import Button from '@components/button/Buttons';
import { requestGetDateVotingDetails } from '@api/meeting/voting';
import { VotingUsers } from '@type/api.meeting';
import Avatar from '@components/member/Avatar';
import { requestConfirmMeetingDate } from '@api/meeting/confirm';

import useAuth from '@hooks/useAuth';
import { CalenderClickEventType } from '@type/meeting.calendar';
import useMeeting from '@hooks/useMeeting';
import { useQuery } from 'react-query';
import { successAlert } from '@utils/alert';
import { QueryKeys } from '@api/queryClient';
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
  meetingId,
}: {
  date: CalenderClickEventType;
  hostId: number;
  meetingId: number;
}) {
  const styles = useStyles();
  const userId = useAuth().myId;
  const title = returnDotDate(date);
  const dayStr = returnDayStr(date.timestamp);
  const isHost = userId === hostId;
  const { totalMemberCounts } = useMeeting();
  const onClickHandler = () => {
    const payload = {
      meetingDateStartFrom: date.dateString,
      meetingDateEndTo: date.dateString,
    };

    requestConfirmMeetingDate({ meetingId, payload }).then(res => {
      if (res.success) successAlert('모임일이 확정되었습니다.🎉');
    });
  };
  // 추후 스켈레톤으로
  const payload = { date: date.dateString };
  const { data: dateDetails } = useQuery([QueryKeys.votingDetails], () =>
    requestGetDateVotingDetails({
      meetingId,
      payload,
    }),
  );

  return (
    <View style={styles.overlayView}>
      <ModalTop title={title} date={dayStr} />
      <View style={styles.overlayViewMiddle}>
        {dateDetails ? (
          <ModalMiddleWithAvatar votingUsers={dateDetails.votingUsers} />
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

function ModalMiddleWithAvatar({
  votingUsers,
}: {
  votingUsers: VotingUsers[];
}) {
  const styles = useStyles();
  const result: React.ReactNode[] = [];
  const isOdd = votingUsers.length % 2 === 1;
  const rendering = () => {
    for (let i = 0; i < votingUsers.length; i += 2) {
      result.push(
        <View
          style={[
            styles.AvatarAndNameViewStyle,
            isOdd && i === votingUsers.length - 1 ? styles.width : {},
          ]}
          key={i}
        >
          <AvatarAndName
            style={styles.LabelSpacing}
            key={votingUsers[i].userId}
            user={votingUsers[i]}
          />
          {i + 1 < votingUsers.length ? (
            <AvatarAndName
              key={votingUsers[i + 1].userId}
              user={votingUsers[i + 1]}
            />
          ) : (
            <View style={styles.blankFlex} />
          )}
        </View>,
      );
    }

    return result;
  };

  return (
    <ScrollView contentContainerStyle={styles.middleAvatarAndNameView}>
      {rendering()}
    </ScrollView>
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

function AvatarAndName({
  user,
  style,
}: {
  user: VotingUsers;
  style?: StyleProp<ViewStyle>;
}) {
  const { nickname, profileImageUrl } = user;
  const styles = useStyles();

  return (
    <View style={[styles.AvatarAndNameOneUser, style]}>
      <Avatar
        size={28}
        path={profileImageUrl}
        containerStyle={styles.AvatarAndName}
      />
      <Font style={{ textAlign: 'center' }}>
        {nickname.length > 5 ? `${nickname.slice(0, 4)} ..` : nickname}
      </Font>
    </View>
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
    height: 100,
    width: '100%',

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
  AvatarAndName: { marginRight: 10 },
  AvatarAndNameViewStyle: {
    flex: 1,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 1.5,
  },
  AvatarAndNameOneUser: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  LabelSpacing: {
    marginRight: 20,
  },
  width: {
    width: '100%',
  },
  blankFlex: {
    flex: 0.5,
  },
}));
