import React from 'react';
import { ScrollView } from 'react-native';

import Preview from '@post/components/detail/planner/placeCard/preview/Preview';
import Tag from '@post/components/detail/planner/placeCard/tag/Tag';
import Content from '@post/components/detail/planner/placeCard/content/Content';
import NextStepButton from '@post/components/detail/planner/placeCard/button/NextStep';

export default function MeetingPlanner() {
  return (
    <ScrollView>
      <Preview />
      <Tag />
      <Content />
      <NextStepButton />
    </ScrollView>
  );
}
