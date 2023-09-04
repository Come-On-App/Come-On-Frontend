import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { ScreenTitle } from '@shared/components/font/Font';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { QueryKey } from '@app/api/type';
import { requestGetMeetingMembers } from '@post/api/v2';
import { invert } from '@shared/utils';
import useDetailManagement from '@post/hooks/useDetailManagement';
import MemberCount from './memberCount/MemberCount';
import Members from './members/Members';

const TITLE = '모임 멤버';

export default function Participants() {
  const {
    detailState: { postId },
  } = useDetailManagement();
  const { data, isSuccess } = useQuery({
    queryKey: [QueryKey.detail, QueryKey.members, postId],
    queryFn: ({ signal }) => requestGetMeetingMembers(postId, signal),
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
