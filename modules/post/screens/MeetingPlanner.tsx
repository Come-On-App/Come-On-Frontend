import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Preview from '@post/components/detail/planner/placeCard/preview/Preview';
import Tag from '@post/components/detail/planner/placeCard/tag/Tag';
import Content from '@post/components/detail/planner/placeCard/content/Content';
import NextStepButton from '@post/components/detail/planner/placeCard/button/NextStep';
import useKeyboardAwareScroll from '@shared/hooks/useKeyboardAwareScroll';

export default function MeetingPlanner() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [setYCoordinate, setFocusedItemKey] =
    useKeyboardAwareScroll(scrollViewRef);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })}>
        <ScrollView ref={scrollViewRef}>
          <Preview />
          <Tag />
          <Content onLayout={setYCoordinate} onFocus={setFocusedItemKey} />
          <NextStepButton />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
