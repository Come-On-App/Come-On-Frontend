import { Pressable, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { formatDateRange } from '@shared/utils';
import Font from '@shared/components/font/Font';
import { PostDetailNavigation } from '@post/navigation/type';
import { Ischedule } from './type';
import useStyles from './style';

export default function Schedule(props: Ischedule) {
  const { range, fixedDate } = props;
  const isFixed = Boolean(fixedDate);
  const { container, cFont, descriptionFont, divider, rangeFont } =
    useStyles(isFixed);
  const navigation = useNavigation<PostDetailNavigation<'PostDetail'>>();

  return (
    <Pressable
      style={[container]}
      onPress={() => navigation.navigate('PostDetailVote', props)}
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
