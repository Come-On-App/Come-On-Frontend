import React from 'react';
import { ScrollView } from 'react-native';

import Preview from '@post/components/detail/planner/preview/Preview';
import Tag from '@post/components/detail/planner/creation/tag/Tag';
import Content from '@post/components/detail/planner/creation/content/Content';
import NextStepButton from '@post/components/detail/planner/creation/button/NextStep';

const NO_BOUNCES = false;

export default function AddPlanner() {
  return (
    <ScrollView bounces={NO_BOUNCES}>
      <Preview />
      <Tag />
      <Content />
      <NextStepButton />
    </ScrollView>
  );
}
