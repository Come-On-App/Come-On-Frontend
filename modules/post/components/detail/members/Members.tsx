import { ScrollView } from 'react-native';
import React from 'react';
import { Imembers } from './type';
import Member from '../member/Member';

export default function Members({ users }: Imembers) {
  return (
    <ScrollView horizontal>
      {users.map(({ nickname, profileImageUrl }) => (
        <Member nickname={nickname} profileImageUrl={profileImageUrl} />
      ))}
    </ScrollView>
  );
}
