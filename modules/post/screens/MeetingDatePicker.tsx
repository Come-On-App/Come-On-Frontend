import React, { useCallback } from 'react';

import TestId from '@shared/constants/testIds';
import Calendar from '@shared/components/calendar/Calendar';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import VoteGuideRobot from '@post/components/voteDateMessage/VoteDateMessage';
import usePostManagement from '@post/hooks/usePostManagement';
import { PostStackParamList } from '@post/navigation/type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';

const ViewContainer = Platform.OS === 'android' ? SafeAreaView : View;

export default function MeetingDatePicker({
  route: { params = { prevDateRange: { startingDay: null, endingDay: null } } },
}: NativeStackScreenProps<PostStackParamList, 'MeetingDateSelector'>) {
  const { dispatchDateRange, postState } = usePostManagement();
  const onloadPreviousDate = useCallback(() => {
    return params.prevDateRange;
  }, [params.prevDateRange]);

  return (
    <ViewContainer>
      <ScreenLayout testID={TestId.post.dateSelector}>
        <Calendar
          onDayPress={dispatchDateRange}
          loadPreviousDate={onloadPreviousDate}
          current={params.prevDateRange.startingDay?.dateString}
        />
        <VoteGuideRobot dateRange={postState.dateRange} />
      </ScreenLayout>
    </ViewContainer>
  );
}
