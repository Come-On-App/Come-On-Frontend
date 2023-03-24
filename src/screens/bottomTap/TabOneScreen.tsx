import { Keyboard, View } from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '@components/SearchBar';
import { IconButton } from '@components/button/Buttons';
import CardList from '@components/meetingCard/CardList';
import { MeetingMode } from '@features/meetingSlice';
import { useGoToCreateMeetingScreen } from '@hooks/useGoTo';

// 모임 관리 스크린
export default function TabOneScreen() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <OneScreenTop />
      <OneScreenMain />
    </SafeAreaView>
  );
}

function OneScreenTop() {
  const styles = useStyles();

  return (
    <View style={styles.screenTopContainer}>
      <DateRangeSerchBar />
      <CreateMeetingRoomButton />
    </View>
  );
}

function OneScreenMain() {
  const styles = useStyles();

  return (
    <View style={styles.cardContainer}>
      <CardList />
    </View>
  );
}

function DateRangeSerchBar() {
  const [search, setSearch] = useState('날짜 검색 업데이트 예정');
  const updateSearch = () => {
    Keyboard.dismiss();
    setSearch(prev => prev);
  };
  const styles = useStyles();

  return (
    <View style={styles.serchContainer}>
      <SearchBar IconType="date-range" value={search} onChange={updateSearch} />
    </View>
  );
}

function CreateMeetingRoomButton() {
  const styles = useStyles();
  const goToCreateMeetingScreen = useGoToCreateMeetingScreen(
    MeetingMode.create,
  );

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

const useStyles = makeStyles(() => ({
  screenContainer: {
    flex: 1,
    paddingBottom: -38, // 네비게이션 탭 패딩 공간 제거
  },
  screenTopContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
  },
  serchContainer: {
    flex: 0.85,
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
