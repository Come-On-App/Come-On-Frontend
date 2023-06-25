import { ScrollView } from 'react-native';
import React from 'react';
import { Imembers } from './type';
import Member from '../member/Member';

export default function Members({ members }: Imembers) {
  return (
    <ScrollView horizontal>
      {members.map(({ nickname, profileImageUrl }) => (
        <Member
          key={nickname + profileImageUrl}
          nickname={nickname}
          profileImageUrl={profileImageUrl}
        />
      ))}
    </ScrollView>
  );
}
