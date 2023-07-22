import React from 'react';
import { View } from 'react-native';

import Font from '@shared/components/font/Font';
import RobotIcon from '@post/components/emptyCardList/logo/RobotIcon';
import { IvoteGuideRobot } from './type';
import useStyles from './style';

export default function VoteGuideRobot({
  startingDate,
  endingDate,
}: IvoteGuideRobot) {
  const { wrap, robot, cMessage } = useStyles();

  return (
    <View style={wrap}>
      <View style={robot}>
        <RobotIcon />
      </View>
      <View style={cMessage}>{VoteDateMessage(startingDate, endingDate)}</View>
    </View>
  );
}

function VoteDateMessage(
  startingDate: string | null,
  endingDate: string | null,
) {
  const { messageFont } = useStyles();

  if (!startingDate && !endingDate) {
    return <Font style={messageFont}>모임 투표 범위를 지정해주세요.</Font>;
  }

  if (startingDate && endingDate) {
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

  if (startingDate) {
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
