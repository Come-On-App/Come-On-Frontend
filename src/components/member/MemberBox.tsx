import React, { useLayoutEffect, useState } from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import { makeStyles, Avatar } from '@rneui/themed';
import { Members } from '@type/api.meeting';
import {
  requestMeetingMembers,
  requestMeetingMembersDrop,
} from '@api/meeting/members';
import { ButtonGroup } from '@components/buttons/Buttons';
import useAuth from '@hooks/useAuth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import useSocketMeeting from '@hooks/useSocketMeeting';
import {
  BanMemberAvatarProps,
  LittleMemberBoxProps,
  OnLineAvatarProps,
} from '@type/meeting.memberBox';
import {
  MemberBoxProps,
  MemberBoxSubTitleProps,
  MemberBoxTitleProps,
  UserRowProps,
} from '../../types';
import Label from '../input/Label';
import Font from '../Font';
import BadgedAvatar from './BadgedAvatar';

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

function LittleMemberBox({
  item,
  banUserList,
  children,
}: LittleMemberBoxProps) {
  const styles = useStyles();

  return (
    <View
      style={[
        styles.userBoxStyle,
        banUserList.includes(item.userId)
          ? styles.selectedBanUser
          : styles.normalUser,
      ]}
    >
      {children}
    </View>
  );
}

function MemberAvatar({
  item,
  banUserList,
  onlineUserList,
  hostId,
  onPressAvatar,
}: BanMemberAvatarProps) {
  const styles = useStyles();

  return (
    <View key={item.memberId}>
      {item.userId === hostId && <MasterIcon />}

      {onlineUserList && onlineUserList.includes(item.userId) ? (
        <LittleMemberBox item={item} banUserList={banUserList}>
          <OnLineUserAvatar
            item={item}
            onPressHandler={() => onPressAvatar(item)}
          />
        </LittleMemberBox>
      ) : (
        <LittleMemberBox item={item} banUserList={banUserList}>
          <Avatar
            size={40}
            rounded
            source={{ uri: item.profileImageUrl! }}
            containerStyle={
              (styles.avatar,
              {
                padding: 2,
                backgroundColor: styles.badgeStyle.backgroundColor,
              })
            }
            onPress={() => onPressAvatar(item)}
          />
        </LittleMemberBox>
      )}
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

  // 실시간 갱신
  useLayoutEffect(() => {
    if (ONLINE_UPDATE || MEMBER_UPDATE) {
      requestMeetingMembers(meetingId).then(res => {
        setMeetingUsers(res.contents);
      });
      onlineUserUpdateEnd();
    }
  }, [MEMBER_UPDATE, ONLINE_UPDATE, onlineUserUpdateEnd]);

  // 초기화
  useLayoutEffect(() => {
    requestMeetingMembers(meetingId).then(res => {
      setMeetingUsers(res.contents);
    });
  }, []);
  const renderAvatar = (users: Members[]) => {
    return users.map(item => (
      <MemberAvatar
        key={item.memberId}
        item={item}
        banUserList={banUserList}
        onlineUserList={onlineUserList}
        hostId={hostId}
        onPressAvatar={onPressAvatarforBan}
      />
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
  const firstButtonConfig = {
    text: '선택해제',
    onPress: onPressBanCancelHandelr,
    style: styles.banCancelBtnStyle,
  };
  const secondButtonConfig = {
    text: '내보내기',
    onPress: onPressBanUserHandelr,
    style: styles.banBtnStyle,
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
        <View style={styles.groupButtonStyle}>
          <ButtonGroup
            height={40}
            firstButton={firstButtonConfig}
            secondButton={secondButtonConfig}
          />
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
  normalUser: {
    marginRight: 5,
  },
  groupButtonStyle: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 28,
    flexDirection: 'row',
  },
}));
