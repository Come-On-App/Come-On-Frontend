import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { ScreenTitle } from '@shared/components/font/Font';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { QueryKeys } from '@app/api/type';
import { requestGetMeetingMembers } from '@post/api/v2';
import { invert } from '@shared/utils';
import MemberCount from './memberCount/MemberCount';
import Members from './members/Members';
import { Iparticipants } from './type';

const TITLE = '모임 멤버';

export default function Participants({ id }: Iparticipants) {
  const { data, isSuccess } = useQuery({
    queryKey: [QueryKeys.members, id],
    queryFn: ({ signal }) => requestGetMeetingMembers(id, signal),
  });

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
          {data ? <MemberCount headcount={data.contents.length ?? 0} /> : null}
        </ContentHeader>
        <Members response={data} isLoading={invert(isSuccess)} />
      </ScreenLayout>
    </DividerWrapper>
  );
}
