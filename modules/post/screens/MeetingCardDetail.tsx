import { ScrollView } from 'react-native';
import React from 'react';
import { isEmpty } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PostDetailNativeStack } from '@post/navigation/type';
import EmptyTextField from '@post/components/detail/planner/fieldDisplay/EmptyTextField';
import FieldDisplay from '@post/components/detail/planner/fieldDisplay/FieldDisplay';
import { fullScreenContainer } from '@shared/constants/style';

export default function MeetingCardDetail({
  route: {
    params: { fields },
  },
}: PostDetailNativeStack<'PostDetailMeetingCardDetail'>) {
  if (isEmpty(fields)) {
    return <EmptyTextField />;
  }

  return (
    <SafeAreaView style={fullScreenContainer}>
      <ScrollView>
        {fields.map((field) => {
          return <FieldDisplay field={field} key={field.itemKey} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
