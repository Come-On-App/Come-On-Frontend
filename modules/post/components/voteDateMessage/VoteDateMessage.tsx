import React from 'react';
import { View } from 'react-native';

import Font from '@shared/components/font/Font';
import RobotLogo from '@shared/components/logo/RobotLogo';
import { koFormattedDate } from '@shared/utils';
import { DateRange } from '@post/features/post/type';
import useStyles from './style';

export default function VoteGuideRobot({
  dateRange,
}: {
  dateRange: DateRange;
}) {
  const { wrap, robot, cMessage } = useStyles();

  return (
    <View style={wrap}>
      <View style={robot}>
        <RobotLogo />
      </View>
      <View style={cMessage}>
        <VoteDateMessage dateRange={dateRange} />
      </View>
    </View>
  );
}

function VoteDateMessage({ dateRange }: { dateRange: DateRange }) {
  const { messageFont } = useStyles();
  const { startingDay, endingDay } = dateRange;

  if (!startingDay && !endingDay) {
    return <Font style={messageFont}>모임 투표 범위를 지정해주세요.</Font>;
  }

  if (startingDay && endingDay) {
    const [startingDate, endingDate] = koFormattedDate({
      startFrom: startingDay.dateString,
      endTo: endingDay.dateString,
    });

    return (
      <>
        <Font style={messageFont}>현재 모임의 투표 가능한 날짜는</Font>
        <Font bold style={messageFont}>
          {startingDate}부터
        </Font>
        <Font bold style={messageFont}>
          {endingDate}까지입니다.
        </Font>
      </>
    );
  }

  if (startingDay) {
    const [startingDate] = koFormattedDate({
      startFrom: startingDay.dateString,
    });

    return (
      <>
        <Font style={messageFont}>현재 모임의 투표 가능한 날짜는</Font>
        <Font bold style={messageFont}>
          {startingDate} 당일입니다.
        </Font>
      </>
    );
  }

  return null;
}
