import { View } from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import fn from '@utils/fn';
import useMeetings from '@hooks/useMeetings';
import SearchBar from '@components/SearchBar';
import { IconButton } from '@components/buttons/Buttons';
import CardList, { CardListSkeleton } from '@components/card/CardList';

function DateRangeSerchBar() {
  const [search, setSearch] = useState('2022.08.28 ~ 2022.08.30');
  const updateSearch = (text: string) => {
    setSearch(text);
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
  const { sliceResponse } = useMeetings();

  if (fn.isEmpty(sliceResponse)) {
    return (
      <View style={styles.cardContainer}>
        <CardListSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <CardList cardItems={sliceResponse.contents} />
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
    paddingBottom: -38, // 네비게이션 탭 패딩 공간 제거
  },
  screenTopContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
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
