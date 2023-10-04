import React, { useCallback, useEffect } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TestId from '@shared/constants/testIds';
import Duration from '@post/components/detail/duration/Duration';
import Participants from '@post/components/detail/participants/Participants';
import Planner from '@post/components/detail/planner/Planner';
import { PostDetailNativeStack } from '@post/navigation/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import usePlannerManagement from '@post/hooks/usePlannerManagement';
import { fullScreenContainer } from '@shared/constants/style';
import setStatusBarVisible from '@shared/utils/statusBar';
import TopImage, {
  SCROLL_BASELINE,
  SCROLL_THROTTLE_VALUE,
} from '@post/components/detail/topImage/TopImage';

export default function MeetingPostDetail({
  route: {
    params: { id, title, imagePath },
  },
}: PostDetailNativeStack<'PostDetail'>) {
  const { dispatchCurrentPostId, initDetailState } = useDetailManagement();
  const { initPlannerState } = usePlannerManagement();
  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = e.nativeEvent.contentOffset.y;

      setStatusBarVisible(scrollY > SCROLL_BASELINE);
    },
    [],
  );

  useEffect(() => {
    dispatchCurrentPostId(id);

    return () => {
      initDetailState();
      initPlannerState();

      setStatusBarVisible(false);
    };
  }, [dispatchCurrentPostId, initDetailState, initPlannerState, id]);

  return (
    <SafeAreaView edges={['bottom']} style={[fullScreenContainer]}>
      <ScrollView
        testID={TestId.post.detail}
        onScroll={handleScroll}
        scrollEventThrottle={SCROLL_THROTTLE_VALUE}
      >
        <TopImage imagePath={imagePath} title={title} />
        <Participants />
        <Duration />
        <Planner />
      </ScrollView>
    </SafeAreaView>
  );
}
