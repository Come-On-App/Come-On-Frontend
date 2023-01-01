import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { makeStyles, Avatar } from '@rneui/themed';
import theme from '../constants/themed';
import Icon from '../components/Icon';
import Font from '../components/StyledText';
import AddCourseButton from '../components/buttons/addCourseButton';

function MeetingRoom() {
  const styles = useStyles();
  const userNumber = 8;
  const imageUrl = 'https://randomuser.me/api/portraits/men/36.jpg';

  return (
    <View style={styles.container}>
      <View>
        <Font style={styles.label}>
          모임멤버{' '}
          <Font style={[styles.label, styles.colorText]}>{userNumber}</Font>
        </Font>
        <View style={styles.userContainer}>
          <Avatar size={40} rounded source={{ uri: imageUrl }} key={1} />
        </View>
      </View>
      <View>
        <Font style={styles.label}>모임일정</Font>
        <Text>캘린더</Text>
      </View>
      <View>
        <Text style={styles.label}>모임장소</Text>
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
  label: {
    color: theme.grayscale?.[900],
    fontSize: theme.textStyles?.title4?.fontSize,
    lineHeight: theme.textStyles?.title4?.lineHeight,
    fontWeight: 'bold',
  },
  text: {
    color: theme.grayscale?.[700],
    lineHeight: theme.textStyles?.body1?.lineHeight,
    fontSize: theme.textStyles?.body1?.fontSize,
  },
  colorText: {
    color: theme.lightColors?.primary,
  },

  userContainer: {
    marginTop: 12,
    marginBottom: 28,
  },
}));
