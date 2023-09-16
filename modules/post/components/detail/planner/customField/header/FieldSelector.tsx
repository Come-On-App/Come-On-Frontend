import React from 'react';
import { isEmpty } from 'lodash';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { ScreenTitle } from '@shared/components/font/Font';
import usePlannerManagement from '@post/hooks/usePlannerManagementByStatus';
import TagFieldSelector from '@post/components/detail/planner/customField/creation/TagFieldSelector';

const SCREEN_TITLE = '커스텀 필드';

export default function FieldSelector() {
  const {
    plannerState: { customModuleFields },
  } = usePlannerManagement();

  return (
    <DividerWrapper position={isEmpty(customModuleFields) ? 'both' : 'top'}>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{SCREEN_TITLE}</ScreenTitle>
        </ContentHeader>
        <TagFieldSelector />
      </ScreenLayout>
    </DividerWrapper>
  );
}
