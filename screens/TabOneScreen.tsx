import { View } from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import SerchBar from '../components/SerchBar';
import CardList from '../components/card/CardList';

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

  return (
    <SerchBar IconType="date-range" value={search} onChange={updateSearch} />
  );
}

export default function TabOneScreen() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.serchContainer}>
        <DateRangeSerchBar />
      </View>
      <View style={styles.cardContainer}>
        <CardList cardItems={testItems} />
      </View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles(() => ({
  screenContainer: {
    flex: 1,
    paddingBottom: -30, // 네비게이션 탭 패딩 공간 제거
  },
  serchContainer: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
}));
