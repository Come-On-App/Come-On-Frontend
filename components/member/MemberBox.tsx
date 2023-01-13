import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { makeStyles } from '@rneui/themed';

import { MeetingUser, MemberBoxProps } from '../../types';
import Label from '../inputComponents/Label';
import Avatar from './Avatar';
import Font from '../StyledText';

function MemberBox({ myId, myRole, meetingUsers }: MemberBoxProps) {
  const filterStaff = () => {
    const meetingStaff = meetingUsers.filter(
      item => item.meetingRole === 'HOST' || item.meetingRole === 'EDITOR',
    );
    const meetingMembers = meetingUsers.filter(
      item => item.meetingRole === 'PARTICIPANT',
    );

    return [meetingStaff, meetingMembers];
  };
  const filtered = filterStaff();
  const staff = filtered[0];
  const members = filtered[1];
  const styles = useStyles(members);
  const [visible, setVisible] = useState(false);
  const onClickManage = () => {
    setVisible(!visible);
  };
  const renderStaffAvatar = () => {
    return staff.map((item, index) => (
      <Avatar
        key={item.id}
        size={40}
        path={item.imageLink}
        containerStyle={[
          item.id === myId ? styles.logOnAvatar : styles.logOffAvatar,
          index === staff.length - 1 ? styles.lastAvatar : styles.avatar,
        ]}
      />
    ));
  };
  const renderMemberAvatar = () => {
    return members.map((item, index) => (
      <Avatar
        key={item.id}
        size={40}
        path={item.imageLink}
        containerStyle={[
          item.id === myId ? styles.logOnAvatar : styles.logOffAvatar,
          index === members.length - 1 ? styles.lastAvatar : styles.avatar,
        ]}
      />
    ));
  };

  return (
    <View>
      <View style={styles.meetingMembersubTitle}>
        <View style={styles.meetingMemberLabelStyle}>
          <Label>모임멤버 </Label>
          <Label style={styles.colorText}>{meetingUsers.length}</Label>
        </View>
        {myRole === 'HOST' && (
          <Pressable
            onPress={onClickManage}
            style={({ pressed }) => (pressed ? styles.pressed : {})}
          >
            <Font style={styles.editMember}>멤버관리</Font>
          </Pressable>
        )}
      </View>
      <View style={styles.memberBox}>
        <ScrollView style={styles.scrollContainer} horizontal>
          <View style={styles.staffRow}>{renderStaffAvatar()}</View>
        </ScrollView>
        {members && (
          <ScrollView horizontal style={styles.membersScrollContainer}>
            <View style={styles.memberRow}>{renderMemberAvatar()}</View>
          </ScrollView>
        )}
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

export default MemberBox;

const useStyles = makeStyles((theme, members: MeetingUser[]) => ({
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
    marginTop: 8,
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
