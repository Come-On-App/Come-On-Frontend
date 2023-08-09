import React from 'react';
import { View } from 'react-native';

import Font from '@shared/components/font/Font';
import RobotLogo from '@shared/components/logo/RobotLogo';
import { koFormattedDate } from '@shared/utils';
import useStyles from './style';
import noName from './config';
import { IvoteGuideRobot } from './type';

export default function VoteGuideRobot({ type, dateRange }: IvoteGuideRobot) {
  const { wrap, robot, cMessage } = useStyles();

  return (
    <View style={wrap}>
      <View style={robot}>
        <RobotLogo />
      </View>
      <View style={cMessage}>
        <VoteDateMessage dateRange={dateRange} type={type} />
      </View>
    </View>
  );
}

function VoteDateMessage({ type = 'default', dateRange }: IvoteGuideRobot) {
  const { messageFont } = useStyles();
  const { startingDay, endingDay } = dateRange;
  const { description, empty } = noName[type];

  if (!startingDay && !endingDay) {
    return <Font style={messageFont}>{empty}</Font>;
  }

  if (startingDay && endingDay) {
    const [startingDate, endingDate] = koFormattedDate({
      startFrom: startingDay.dateString,
      endTo: endingDay.dateString,
    });

    return (
      <>
        <Font style={messageFont}>{description}</Font>
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
        <Font style={messageFont}>{description}</Font>
        <Font bold style={messageFont}>
          {startingDate} 입니다.
        </Font>
      </>
    );
  }

  return null;
}
