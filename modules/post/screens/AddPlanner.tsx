import React from 'react';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { ScreenTitle } from '@shared/components/font/Font';
import Venue from '@post/components/detail/planner/venue/Venue';

export default function AddPlanner() {
  return (
    <>
      <DividerWrapper>
        <ScreenLayout>
          <ContentHeader>
            <ScreenTitle>미리보기</ScreenTitle>
          </ContentHeader>
          <Venue
            order={1}
            info={{
              title: '카드 제목',
              content: '카드 내용',
              address: '주소',
              type: '기타',
            }}
            showRightIcon={false}
          />
        </ScreenLayout>
      </DividerWrapper>
      <DividerWrapper>
        <ScreenLayout>
          <ContentHeader>
            <ScreenTitle>AddPlanner</ScreenTitle>
          </ContentHeader>
        </ScreenLayout>
      </DividerWrapper>
    </>
  );
}
