import React, { useEffect, useState } from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import { makeStyles, Button, Avatar } from '@rneui/themed';
import { Members } from '@type/api.meeting';
import {
  requestMeetingMembers,
  requestMeetingMembersDrop,
} from '@api/meeting/members';
import { useAppDispatch } from '@app/hooks';
import { setOnlineUserUpdateEnd } from '@features/socketSlice';
import useAuth from '@hooks/useAuth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import useSocketMeeting from '@hooks/useSockerMeeting';
import {
  MemberBoxProps,
  MemberBoxSubTitleProps,
  MemberBoxTitleProps,
  UserRowProps,
} from '../../types';
import Label from '../input/Label';
import Font from '../Font';
import BadgedAvatar from './BadgedAvatar';

interface OnLineAvatarProps {
  item: Members;
  onPressHandler: () => void;
}

function OnLineUserAvatar({ item, onPressHandler }: OnLineAvatarProps) {
  const { profileImageUrl } = item;
  const styles = useStyles();

  return (
    <BadgedAvatar
      size={40}
      path={profileImageUrl}
      badge={{
        icon: {
          iconName: 'circle',
          size: styles.badgeStyle.size,
          color: styles.badgeStyle.color,
        },
        backgroundColor: styles.badgeStyle.backgroundColor,
      }}
      containerStyle={{
        padding: 2,
        backgroundColor: styles.badgeStyle.backgroundColor,
      }}
      onPress={onPressHandler}
    />
  );
}

function MasterIcon() {
  const styles = useStyles();

  return (
    <View style={styles.MasterIconStyle}>
      <Text style={styles.MasterIconSize}>👑</Text>
    </View>
  );
}

function MemberBox({ hostId }: MemberBoxProps) {
  const meetingId = 130;
  const { myId } = useAuth();
  const styles = useStyles();
  const [visible, setVisible] = useState(false);
  const [meetingUsers, setMeetingUsers] = useState<Members[]>([]);
  const { ONLINE_UPDATE, MEMBER_UPDATE, onlineUserList, onlineUserUpdateEnd } =
    useSocketMeeting();

  // 실시간 갱신
  useEffect(() => {
    if (ONLINE_UPDATE || MEMBER_UPDATE) {
      requestMeetingMembers(meetingId).then(res => {
        setMeetingUsers(res.contents);
      });
      onlineUserUpdateEnd();
    }
  }, [MEMBER_UPDATE, ONLINE_UPDATE, onlineUserUpdateEnd]);

  // 초기화
  useEffect(() => {
    requestMeetingMembers(meetingId).then(res => {
      setMeetingUsers(res.contents);
    });
  }, []);
  // host구분
  const filterStaff = () => {
    const meetingStaff = meetingUsers.filter(
      item => item.memberRole === 'HOST',
    );
    const meetingMembers = meetingUsers.filter(
      item => item.memberRole === 'PARTICIPANT',
    );

    return [meetingStaff, meetingMembers];
  };
  const [host, members] = filterStaff();
  // 모달창 설정
  const onClickManage = () => {
    setVisible(!visible);
  };
  const onPressAvatarforBan = (item: Members) => {
    if (!visible) return;

    if (item.userId === hostId) {
      Toast.show({ text1: '방장은 선택할 수 없습니다.' });

      return;
    }

    const isSelected = banUserList.includes(item.userId);

    if (!isSelected) {
      setBanUserList([...banUserList, item.userId]);
    } else {
      const newList = banUserList.filter(userId => userId !== item.userId);

      setBanUserList(newList);
    }
  };
  const renderAvatar = (users: Members[]) => {
    return users.map(item => (
      <View key={item.memberId}>
        {item.userId === hostId && <MasterIcon />}

        {onlineUserList.includes(item.userId) ? (
          <View
            style={[
              styles.userBoxStyle,
              banUserList.includes(item.userId)
                ? styles.selectedBanUser
                : styles.normarUser,
            ]}
          >
            <OnLineUserAvatar
              item={item}
              onPressHandler={() => onPressAvatarforBan(item)}
            />
          </View>
        ) : (
          <View
            style={[
              styles.userBoxStyle,
              banUserList.includes(item.userId)
                ? styles.selectedBanUser
                : styles.normarUser,
            ]}
          >
            <Avatar
              size={40}
              rounded
              source={
                item.profileImageUrl !== null
                  ? // 추후 디폴트 props 이미지를 넣어야 할 것 같음
                    { uri: item.profileImageUrl! }
                  : undefined
              }
              containerStyle={
                (styles.avatar,
                {
                  padding: 2,
                  backgroundColor: styles.badgeStyle.backgroundColor,
                })
              }
              onPress={() => onPressAvatarforBan(item)}
            />
          </View>
        )}
      </View>
    ));
  };
  const [banUserList, setBanUserList] = useState<number[]>([]);
  const onPressBanUserHandelr = () => {
    banUserList.forEach(user => {
      requestMeetingMembersDrop({ meetingId, targetUserId: user }).then(res => {
        if (res.success) banUserList.shift();
      });
    });
  };
  const onPressBanCancelHandelr = () => {
    setBanUserList([]);
  };

  return (
    <View>
      <View style={styles.meetingMembersubTitle}>
        <MemberBoxTitle userCount={meetingUsers.length} />
        {hostId === myId && <MemberBoxSubTitle onClickManage={onClickManage} />}
      </View>
      <View style={styles.memberBox}>
        <UserRow user={[...host, ...members]} renderAvatar={renderAvatar} />
      </View>
      {visible && (
        <View>
          {/** todo 추후 그룹 버튼 넣기 */}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: 16,
              marginBottom: 28,
              flexDirection: 'row',
            }}
          >
            <Button
              title="선택해제"
              buttonStyle={styles.banCancelBtnStyle}
              onPress={onPressBanCancelHandelr}
            />
            <Button
              title="내보내기"
              buttonStyle={styles.banBtnStyle}
              onPress={onPressBanUserHandelr}
            />
          </View>
        </View>
      )}
    </View>
  );
}

function MemberBoxTitle({ userCount }: MemberBoxTitleProps) {
  const styles = useStyles();

  return (
    <View style={styles.meetingMemberLabelStyle}>
      <Label>모임멤버 </Label>
      <Label style={styles.colorText}>{userCount}</Label>
    </View>
  );
}

function UserRow({ user, renderAvatar }: UserRowProps) {
  const styles = useStyles();

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentScrollContainer}
      horizontal
    >
      <View style={styles.memberRow}>{renderAvatar(user)}</View>
    </ScrollView>
  );
}

function MemberBoxSubTitle({ onClickManage }: MemberBoxSubTitleProps) {
  const styles = useStyles();

  return (
    <Pressable
      onPress={onClickManage}
      style={({ pressed }) => (pressed ? styles.pressed : {})}
    >
      <Font style={styles.editMember}>멤버관리</Font>
    </Pressable>
  );
}

export default MemberBox;

const useStyles = makeStyles((theme, members: Members[]) => ({
  meetingMemberLabelStyle: {
    flexDirection: 'row',
  },
  meetingMembersubTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorText: {
    color: theme.colors.primary,
  },
  memberBox: {
    justifyContent: 'center',
    marginTop: 12,
    height: 60,

    marginBottom: 12,
  },

  scrollContainer: {
    height: 60,
  },
  contentScrollContainer: {
    alignItems: 'center',
  },
  membersScrollContainer: {
    height: 50,
  },

  badgeStyle: {
    size: 12,
    color: theme.colors.success,
    backgroundColor: 'white',
  },
  memberRow: {
    flexDirection: 'row',
    height: 42,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  logOnAvatar: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderEndColor: theme.colors.secondary,
    padding: 1,
  },
  logOffAvatar: {
    padding: 2,
    backgroundColor: 'white',
  },
  editMember: {
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
    color: theme.grayscale[700],
  },
  pressed: {
    opacity: 0.5,
  },
  MasterIconStyle: {
    position: 'absolute',
    top: -6,
    left: 13,
    zIndex: 10,
  },
  MasterIconSize: {
    fontSize: 14,
  },
  banCancelBtnStyle: {
    backgroundColor: theme.grayscale[400],
    width: 102,
    marginRight: 10,
    borderRadius: 4,
  },
  banBtnStyle: {
    backgroundColor: theme.colors.primary,
    width: 202,
    borderRadius: 4,
  },
  avatarSelectedColor: {
    backgroundColor: theme.colors.secondary,
  },
  userBoxStyle: {
    marginRight: 5,
    width: 46,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBanUser: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  normarUser: {
    marginRight: 5,
  },
}));
