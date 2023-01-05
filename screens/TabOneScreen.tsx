import { View } from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SerchBar from '../components/SerchBar';
import CardList from '../components/card/CardList';
import IconButton from '../components/buttons/IconButton';

const testItems = [
  {
    path: 'https://plus.unsplash.com/premium_photo-1661277693458-6c65cb09aa41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80',
    people: {
      member: 1,
      isDecided: false,
    },
    title: '물개들의 모임',
    subTitle: {
      user: '정배',
      date: '2022.08.28 ~ 2022.08.30',
    },
  },
  {
    path: 'https://images.unsplash.com/photo-1611372876693-4dc4153dee61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1930&q=80',
    people: {
      member: 3,
      isDecided: true,
    },
    title: '부산 정모',
    subTitle: {
      user: '예정',
      date: '2022.09.28 ~ 2022.09.30',
    },
  },
  {
    path: 'https://images.unsplash.com/photo-1617869884925-f8f0a51b2374?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    people: {
      member: 15,
      isDecided: true,
    },
    title: '도쿄 야시장 여행',
    subTitle: {
      user: '하영',
      date: '2022.10.28 ~ 2022.10.30',
    },
  },
];

function DateRangeSerchBar() {
  const [search, setSearch] = useState('2022.08.28 ~ 2022.08.30');
  const updateSearch = (text: string) => {
    setSearch(text);
  };
  const styles = useStyles();

  return (
    <View style={styles.serchContainer}>
      <SerchBar IconType="date-range" value={search} onChange={updateSearch} />
    </View>
  );
}

function CreateMeetingRoomButton() {
  const styles = useStyles();
  const navigation = useNavigation();
  const goToCreateMeetingScreen = () => navigation.navigate('CreateMeeting');

  return (
    <View style={styles.buttonContainer}>
      <IconButton
        icon={{
          iconName: 'add',
          size: styles.buttonIcon.size,
          color: styles.buttonIcon.color,
        }}
        onPress={goToCreateMeetingScreen}
        style={styles.button}
      />
    </View>
  );
}

function OneScreenTop() {
  const [isLoggedin] = useState(true); // SERVER-API: 추후 사용자 로그인 처리
  const styles = useStyles(isLoggedin);

  return (
    <View style={styles.screenTopContainer}>
      <DateRangeSerchBar />
      {isLoggedin && <CreateMeetingRoomButton />}
    </View>
  );
}

function OneScreenMain() {
  const styles = useStyles();

  return (
    <View style={styles.cardContainer}>
      <CardList cardItems={testItems} />
    </View>
  );
}

export default function TabOneScreen() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <OneScreenTop />
      <OneScreenMain />
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme, isLoggedin: boolean) => ({
  screenContainer: {
    flex: 1,
    paddingBottom: -30, // 네비게이션 탭 패딩 공간 제거
  },
  screenTopContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serchContainer: {
    flex: isLoggedin ? 0.85 : 1,
  },
  buttonContainer: {
    flex: 0.15,
    alignItems: 'center',
  },
  buttonIcon: {
    size: 24,
    color: '#231F20',
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
}));
