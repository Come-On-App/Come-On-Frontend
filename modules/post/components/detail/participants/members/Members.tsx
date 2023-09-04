import { ScrollView } from 'react-native';
import React from 'react';

import { Imembers } from './type';
import Member from '../member/Member';
import MembersSkeleton from '../skeleton/MembersSkeleton';

export default function Members({ response, isLoading }: Imembers) {
  if (isLoading) {
    return <MembersSkeleton />;
  }

  return (
    <ScrollView horizontal>
      {response?.contents.map(({ nickname, profileImageUrl }) => (
        <Member
          key={nickname + profileImageUrl}
          nickname={nickname}
          profileImageUrl={profileImageUrl}
        />
      ))}
    </ScrollView>
  );
}
