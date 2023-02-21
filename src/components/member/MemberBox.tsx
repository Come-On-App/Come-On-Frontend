import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { makeStyles } from '@rneui/themed';

import { Members } from '@type/api.meeting';
import {
  MemberBoxProps,
  MemberBoxSubTitleProps,
  MemberBoxTitleProps,
  UserRowProps,
} from '../../types';
import Label from '../input/Label';
import Avatar from './Avatar';
import Font from '../Font';

function MemberBox({ hostId, meetingUsers }: MemberBoxProps) {
  const filterStaff = () => {
    const meetingStaff = meetingUsers.filter(
      item => item.memberRole === 'HOST',
    );
    const meetingMembers = meetingUsers.filter(
      item => item.memberRole === 'PARTICIPANT',
    );

    return [meetingStaff, meetingMembers];
  };
  const [staff, members] = filterStaff();
  const styles = useStyles(members);
  const [visible, setVisible] = useState(false);
  const onClickManage = () => {
    setVisible(!visible);
  };
  // TODO: 회의 후 수정하기, hostId => 접속해있는 유저가 뜨기로
  const renderAvatar = (users: Members[]) => {
    return users.map((item, index) => (
      <Avatar
        key={item.memberId}
        size={40}
        path={item.profileImageUrl}
        containerStyle={[
          item.memberId === hostId ? styles.logOnAvatar : styles.logOffAvatar,
          index === members.length - 1 ? styles.lastAvatar : styles.avatar,
        ]}
      />
    ));
  };

  return (
    <View>
      <View style={styles.meetingMembersubTitle}>
        <MemberBoxTitle userCount={meetingUsers.length} />
        {
          // TODO: 회의 후 수정하기, 접속해있는 유저가 뜨기로
          hostId === 11 && <MemberBoxSubTitle onClickManage={onClickManage} />
        }
      </View>
      <View style={styles.memberBox}>
        <UserRow user={staff} renderAvatar={renderAvatar} />
        {members && <UserRow user={members} renderAvatar={renderAvatar} />}
      </View>
      {visible && (
        <View>
          {/** todo 추후 그룹 버튼 넣기 */}
          <Font>숨겨진 버튼 행</Font>
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
  const isParticipant = user[0].memberRole === 'PARTICIPANT';

  return (
    <ScrollView style={styles.scrollContainer} horizontal>
      <View style={isParticipant ? styles.memberRow : styles.staffRow}>
        {renderAvatar(user)}
      </View>
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
    marginTop: 12,
    marginBottom: 12,
    height: members.length === 0 ? 42 : 92,
  },
  scrollContainer: {
    height: 42,
  },
  membersScrollContainer: {
    height: members.length === 0 ? 0 : 50,
  },
  staffRow: {
    height: 42,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  memberRow: {
    flexDirection: 'row',
    height: 42,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 7,
  },
  lastAvatar: {},
  logOnAvatar: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderEndColor: theme.colors.secondary,
    padding: 2,
  },
  logOffAvatar: {
    padding: 2,
  },
  editMember: {
    fontSize: theme.textStyles.body1.fontSize,
    lineHeight: theme.textStyles.body1.lineHeight,
    color: theme.grayscale[700],
  },
  pressed: {
    opacity: 0.5,
  },
}));
