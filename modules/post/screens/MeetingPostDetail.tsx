import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import TestId from '@shared/constants/testIds';
import Duration from '@post/components/detail/duration/Duration';
import Participants from '@post/components/detail/participants/Participants';
import Planner from '@post/components/detail/planner/Planner';
import { PostDetailNativeStack } from '@post/navigation/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import usePlannerManagement from '@post/hooks/usePlannerManagement';

export default function MeetingPostDetail({
  route: { params },
}: PostDetailNativeStack<'PostDetail'>) {
  const { dispatchCurrentPostId, initDetailState } = useDetailManagement();
  const { initPlannerState } = usePlannerManagement();

  useEffect(() => {
    dispatchCurrentPostId(params.id);

    return () => {
      initDetailState();
      initPlannerState();
    };
  }, [dispatchCurrentPostId, initDetailState, initPlannerState, params.id]);

  return (
    <ScrollView testID={TestId.post.detail}>
      <Participants />
      <Duration />
      <Planner />
    </ScrollView>
  );
}
