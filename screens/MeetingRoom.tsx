import React from 'react';
import { View, Text } from 'react-native';
import { makeStyles, Avatar } from '@rneui/themed';
import theme from '../constants/themed';
import AddCourseButton from '../components/buttons/addCourseButton';
import Label from '../components/inputComponents/Label';

function MeetingRoom() {
  const styles = useStyles();
  const userNumber = 8;
  const imageUrl = 'https://randomuser.me/api/portraits/men/36.jpg';

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.labelContainer}>
          <Label>모임멤버 </Label>
          <Label style={styles.colorText}>{userNumber}</Label>
        </View>
        <View style={styles.userContainer}>
          <Avatar size={40} rounded source={{ uri: imageUrl }} key={1} />
        </View>
      </View>
      <View>
        <Label>모임일정</Label>
        <Text>캘린더</Text>
      </View>
      <View>
        <Label>모임장소</Label>
        <AddCourseButton iconName="map" text="새로운 코스를 추가해보세요!" />
      </View>
    </View>
  );
}

export default MeetingRoom;

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  labelContainer: {
    flexDirection: 'row',
  },
  userContainer: {
    marginTop: 12,
    marginBottom: 28,
  },
  colorText: {
    color: theme.lightColors?.primary,
  },
}));
