import React from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import MemberCount from './memberCount/MemberCount';
import Members from './members/Members';
import { Iparticipants } from './type';
import DividerWrapper from '../DividerWrapper';
import ContentHeader from '../ContentHeader';

const TITLE = '모임 멤버';

export default function Participants({ users }: Iparticipants) {
  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
          <MemberCount headcount={users.length ?? 0} />
        </ContentHeader>
        <Members members={users} />
      </ScreenLayout>
    </DividerWrapper>
  );
}
