import { ScrollView } from 'react-native';
import React from 'react';
import { isEmpty } from 'lodash';

import { PostDetailNativeStack } from '@post/navigation/type';
import EmptyTextField from '@post/components/detail/planner/fieldDisplay/EmptyTextField';
import FieldDisplay from '@post/components/detail/planner/fieldDisplay/FieldDisplay';

export default function MeetingCardDetail({
  route: {
    params: { fields },
  },
}: PostDetailNativeStack<'PostDetailMeetingCardDetail'>) {
  if (isEmpty(fields)) {
    return <EmptyTextField />;
  }

  return (
    <ScrollView>
      {fields.map((field) => {
        return <FieldDisplay field={field} key={field.itemKey} />;
      })}
    </ScrollView>
  );
}
