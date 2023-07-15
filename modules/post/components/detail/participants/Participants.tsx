import React from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import MemberCount from './memberCount/MemberCount';
import Members from './members/Members';
import { Iparticipants } from './type';

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
