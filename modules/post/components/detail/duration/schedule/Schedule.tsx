import { Pressable, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { formatDateRange } from '@shared/utils';
import Font from '@shared/components/font/Font';
import { PostListNavigation } from '@post/navigation/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { Ischedule } from './type';
import useStyles from './style';

export default function Schedule(props: Ischedule) {
  const { range, fixedDate, votingStatus } = props;
  const isFixed = Boolean(fixedDate);
  const { container, cFont, descriptionFont, divider, rangeFont } =
    useStyles(isFixed);
  const navigation = useNavigation<PostListNavigation>();
  const { dispatchVotingStatus, dispatchFixedDate } = useDetailManagement();

  useEffect(() => {
    if (votingStatus) {
      dispatchVotingStatus(votingStatus);
    }
  }, [dispatchVotingStatus, votingStatus]);

  useEffect(() => {
    dispatchFixedDate(fixedDate);
  }, [dispatchFixedDate, fixedDate]);

  return (
    <Pressable
      style={[container]}
      onPress={() => navigation.navigate('MeetingVote', props)}
    >
      <View style={divider} />
      <View style={cFont}>
        <Font style={rangeFont}>
          {formatDateRange(fixedDate || range, 'ko')}
        </Font>
        <Font style={descriptionFont}>
          {getMessageBasedOnFixedDate(isFixed)}
        </Font>
      </View>
    </Pressable>
  );
}

function getMessageBasedOnFixedDate(isFixed: boolean) {
  const NOT_FIXED = '참석 가능 날짜에 투표해 보세요!';
  const FIXED = '날짜가 확정되었습니다!';

  return isFixed ? FIXED : NOT_FIXED;
}
