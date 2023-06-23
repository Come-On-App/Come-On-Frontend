import { View } from 'react-native';
import React from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import MemberCount from './memberCount/MemberCount';
import Members from './members/Members';
import { Iparticipants } from './type';

const TITLE = '모임 멤버';

export default function Participants({ users }: Iparticipants) {
  return (
    <View>
      <ScreenTitle>{TITLE}</ScreenTitle>
      <MemberCount headcount={users.length ?? 0} />
      <Members members={users} />
    </View>
  );
}
