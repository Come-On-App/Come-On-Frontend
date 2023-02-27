import React, { useEffect, useState } from 'react';
import Font, { BoldFont } from '@components/Font';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import Button from '@components/buttons/Buttons';
import { CalenderClickEventType } from '@type/index';
import { requestGetDateVotingDetails } from '@api/meeting/voting';
import {
  GetDateVotingDetailsResponse,
  GetDateVotingListResponse,
  Members,
  VotingUsers,
} from '@type/api.meeting';
import Avatar from '@components/member/Avatar';
import { useAppSelector } from '@app/hooks';
import { requestConfirmMeetingDate } from '@api/meeting/confirm';
import LoadingComponent from './LoadingComponent';

function returnDotMonth(date: CalenderClickEventType) {
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

function AvatarAndName({ user }: { user: VotingUsers }) {
  const { nickname, profileImageUrl } = user;
  const styles = useStyles();

  return (
    <>
      <Avatar
        size={28}
        path={profileImageUrl}
        containerStyle={{ marginRight: 4 }}
      />
      <Font>{nickname}</Font>
    </>
  );
}

function TotalVotingLabel({
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

export function NoUserModal({ date }: { date: CalenderClickEventType }) {
  const styles = useStyles();
  const title = returnDotMonth(date);
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

export default function DateModal({ date }: { date: CalenderClickEventType }) {
  const styles = useStyles();
  const title = returnDotMonth(date);
  const totalMemberCounts = useAppSelector(
    state => state.meeting.totalMeetingMembers,
  );
  const dayStr = returnDayStr(date.timestamp);
  const [dateDetails, setDateDetails] =
    useState<GetDateVotingDetailsResponse>();
  const onClickHandler = () => {
    // Todo 일단 시작날짜와 끝나는 날짜를 동일하게, 나머진 회의에서
    const payload = {
      meetingDateStartFrom: date.dateString,
      meetingDateEndTo: date.dateString,
    };

    requestConfirmMeetingDate({ meetingId: 10, payload }).then(res =>
      console.log(res),
    );
  };

  // 해당 요일을 누른 유저의 정보 받아오기
  useEffect(() => {
    async function fetchDateVotingDetails() {
      const payload = { date: date.dateString };
      const data = await requestGetDateVotingDetails({
        meetingId: 10,
        payload,
      });

      setDateDetails(data);
    }

    fetchDateVotingDetails();
  }, [date.dateString]);
  console.log(dateDetails);

  return (
    <View style={styles.overlayView}>
      <View style={styles.overlayViewTop}>
        <BoldFont style={styles.overlayTitle}>
          {title}({dayStr})
        </BoldFont>
      </View>
      <View style={styles.overlayViewMiddle}>
        {dateDetails ? (
          <View style={styles.middleAvatarAndNameView}>
            {dateDetails.votingUsers.map(user => (
              <AvatarAndName key={user.userId} user={user} />
            ))}
          </View>
        ) : null}
        {/* TODO NULL 대신 SKELLETON추가 */}
      </View>
      {/* TO DO 방장인지에 따라 다른거 보여줄 수 있게 리팩토링  */}
      <View style={styles.overlayLine} />
      <View style={styles.overlayViewBottom}>
        {dateDetails && (
          <TotalVotingLabel
            memberCount={dateDetails!.memberCount}
            totalMemberCount={totalMemberCounts}
          />
        )}
        {true ? (
          <View>
            <Button text="모임일로 확정하기" onPress={onClickHandler} />
          </View>
        ) : null}
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
}));
