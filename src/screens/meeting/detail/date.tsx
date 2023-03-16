import React, { memo } from 'react';
import { View } from 'react-native';

import Layout from '@components/Layout';
import Font, { BoldFont } from '@components/Font';
import Button from '@components/button/Buttons';
import Icon from '@components/Icon';
import { makeStyles } from '@rneui/themed';
import type {
  DateProps,
  DateMainProps,
  DateMainLeftProps,
  DateBottomProps,
} from '@type/meeting.date';
import TimePicker from '@components/meeting/TimePicker';

// 모임 기간
function DateComponent({ calendar, meetingId, navigation }: DateProps) {
  return (
    <Layout>
      <DateTop />
      <DateMain calendar={calendar} meetingId={meetingId} />
      <DateBottom meetingId={meetingId} navigation={navigation} />
    </Layout>
  );
}

function DateTop() {
  const styles = useStyles();

  return <BoldFont style={styles.dateTopTitle}>모임 기간</BoldFont>;
}

function DateMain({ calendar, meetingId }: DateMainProps) {
  const styles = useStyles();

  return (
    <View style={styles.dateMainContainer}>
      <DateMainLeft calendar={calendar} />
      <DateMainRight meetingId={meetingId} />
    </View>
  );
}

function DateMainLeft({ calendar }: DateMainLeftProps) {
  const styles = useStyles();
  const { color, size } = styles.dateMainLeftIcon;
  const calendarText = `${calendar.startFrom} ~ ${calendar.endTo}`;

  return (
    <View style={styles.dateMainLeftLayout}>
      <View style={styles.dateMainLeftContainer}>
        <Icon name="calendar-today" size={size} color={color} />
        <Font style={styles.dateMainLeftCalendar}>{calendarText}</Font>
      </View>
    </View>
  );
}

function DateMainRight({ meetingId }: { meetingId: number }) {
  const styles = useStyles();

  return (
    <View style={styles.dateMainRightLayout}>
      <View style={styles.dateMainRightContainer}>
        <TimePicker meetingId={meetingId} />
      </View>
    </View>
  );
}

function DateBottom({ meetingId, navigation }: DateBottomProps) {
  const styles = useStyles();
  const onPressHandler = () => {
    navigation.navigate('MeetingRoomCalendar', { meetingId });
  };

  return (
    <View style={styles.dateBottomLayout}>
      <Button
        bold
        text="날짜 투표하기"
        onPress={onPressHandler}
        buttonStyle={styles.dateBottomButton}
      />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  dateTopTitle: {
    fontSize: 18,
  },
  dateMainContainer: {
    height: 48,
    flexDirection: 'row',
    marginVertical: 5,
    flex: 1,
  },
  dateMainLeftLayout: {
    flex: 0.7,
  },
  dateMainLeftContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateMainLeftCalendar: {
    fontSize: 16,
    marginLeft: 5,
  },
  dateMainLeftIcon: {
    size: 18,
    color: theme.grayscale['500'],
  },
  dateMainRightLayout: {
    flex: 0.3,
    height: '100%',
    justifyContent: 'center',
  },
  dateMainRightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBottomLayout: {
    marginHorizontal: 5,
  },
  dateBottomButton: {
    backgroundColor: theme.colors.secondary,
  },
}));

export default memo(DateComponent);
