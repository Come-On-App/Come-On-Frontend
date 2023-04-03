import { Keyboard, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { Overlay, makeStyles } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '@components/SearchBar';
import { IconButton } from '@components/button/Buttons';
import CardList from '@components/meetingCard/CardList';
import { MeetingMode } from '@features/meetingSlice';
import useGoToScreen from '@hooks/useGoTo';
import Calendar from '@components/calendar/Calendar';
import FlexButtons from '@components/button/FlexButtons';
import useMeeting from '@hooks/useMeeting';

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

function ModalCalendar({ toggleOverlay }: { toggleOverlay: () => void }) {
  const styles = useStyles();
  const [date, setDate] = useState({
    startDate: '0000-00-00',
    endDate: '0000-00-00',
  });
  const { resetMeetingData, setCalendarDate } = useMeeting();
  const cancelHandler = () => {
    resetMeetingData();
    toggleOverlay();
  };
  const confirmHandelr = () => {
    const data = { startDate: date.startDate, endDate: date.endDate };

    setCalendarDate(data);
    toggleOverlay();
  };

  return (
    <>
      <View style={styles.calendarContainer}>
        <Calendar
          type="DEFAULT"
          options={{ minDate: false, noListCalendar: true }}
        />
      </View>
      <FlexButtons
        style={styles.flexButtonStyle}
        cancelHandler={cancelHandler}
        onPressConfirm={confirmHandelr}
      />
    </>
  );
}

function DateRangeSerchBar() {
  const styles = useStyles();
  const [search, setSearch] = useState('날짜 검색 업데이트 예정');
  const [visible, setVisible] = useState<boolean>(false);
  const updateSearch = () => {
    Keyboard.dismiss();
    setSearch(prev => prev);
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <View style={styles.serchContainer}>
        <Pressable onPress={toggleOverlay}>
          <SearchBar
            IconType="date-range"
            value={search}
            onChange={updateSearch}
          />
        </Pressable>
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayStyle}
      >
        <ModalCalendar toggleOverlay={toggleOverlay} />
      </Overlay>
    </>
  );
}

function CreateMeetingRoomButton() {
  const styles = useStyles();
  const { goToCreateMeetingScreen } = useGoToScreen();

  return (
    <View style={styles.buttonContainer}>
      <IconButton
        icon={{
          iconName: 'add',
          size: styles.buttonIcon.size,
          color: styles.buttonIcon.color,
        }}
        onPress={() => goToCreateMeetingScreen(MeetingMode.create)}
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
    paddingHorizontal: 15,
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
    paddingHorizontal: 15,
  },
  calendarContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  overlayStyle: {
    flex: 0.56,
    width: '80%',
    borderRadius: 10,
  },
  flexButtonStyle: {
    marginBottom: 12,
  },
}));
