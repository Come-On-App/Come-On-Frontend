import React from 'react';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { ScreenTitle } from '@shared/components/font/Font';
import Venue from '@post/components/detail/planner/venue/Venue';
import usePlannerManagementByStatus from '@post/hooks/usePlannerManagementByStatus';

const HIDE_RIGHT_ICON = false;
const SCREEN_TITLE = '미리보기';

/**
 * 장소 카드 미리보기 컴포넌트
 */
export default function Preview() {
  const {
    plannerState: { title, content, subContent, category, customModuleFields },
  } = usePlannerManagementByStatus();

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{SCREEN_TITLE}</ScreenTitle>
        </ContentHeader>
        <Venue
          data={{
            order: 1,
            meetingPlaceId: 0,
            category,
            placeName: title,
            memo: JSON.stringify({
              content,
              fields: customModuleFields,
            }),
            address: subContent,
            lat: 0,
            lng: 0,
            googlePlaceId: 'null',
          }}
          showRightIcon={HIDE_RIGHT_ICON}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
