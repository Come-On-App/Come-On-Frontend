import React from 'react';
import { View } from 'react-native';

import { Slider } from '@rneui/themed';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import { IVotingStatusSlider } from './type';
import useStyles from './style';
import DisplayTotalMember from './display/DisplayTotalMember';
import DisplayDateAndCount from './display/DisplayDateAndCount';

export default function VotingStatus({
  isEnabled,
  dateString,
  voteCount,
  totalMember,
  myVoting,
}: IVotingStatusSlider) {
  const { container, innerContainer, thumb, track } = useStyles();

  return (
    <ScreenLayout>
      <View style={container}>
        <View style={innerContainer}>
          <DisplayDateAndCount
            myVoting={myVoting}
            enabled={isEnabled}
            dateString={dateString}
            voteCount={voteCount}
            totalMember={totalMember}
          />
          <Slider
            disabled
            value={isEnabled ? voteCount : 0}
            maximumValue={totalMember}
            trackStyle={track}
            thumbStyle={thumb}
          />
        </View>
        <DisplayTotalMember member={totalMember} />
      </View>
    </ScreenLayout>
  );
}
