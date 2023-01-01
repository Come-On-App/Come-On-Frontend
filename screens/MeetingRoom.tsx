import React from 'react';
import { View, Text } from 'react-native';
import { makeStyles, Avatar } from '@rneui/themed';
import theme from '../constants/themed';
import AddPlaceButton from '../components/buttons/AddPlaceButton';
import Label from '../components/inputComponents/Label';
import PlaceCard from '../components/places/PlaceCard';
import { PlaceProps, RootStackScreenProps } from '../types';

function MeetingRoom({ navigation }: RootStackScreenProps<'MeetingRoom'>) {
  const styles = useStyles();
  const userNumber = 8;
  const imageUrl = 'https://randomuser.me/api/portraits/men/36.jpg';
  const dummyData: PlaceProps = {
    data: {
      id: 123456,
      name: '쏭타이',
      description: '부산토박이만 아는 맛집',
      lat: 0,
      lng: 0,
      address: '서울시 마포구 어쩌구',
      order: 1,
      apiId: 21232,
      category: '음식점',
    },
  };

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
        <PlaceCard data={dummyData.data} />
        <AddPlaceButton
          navigation={navigation}
          iconName="map"
          text="새로운 코스를 추가해보세요!"
        />
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
