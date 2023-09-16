import React from 'react';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { ScreenTitle } from '@shared/components/font/Font';
import Dropdown from '@shared/components/dropdown/Dropdown';
import { CategoryKey } from '@post/api/v2/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import usePlannerManagementByStatus from '@post/hooks/usePlannerManagementByStatus';
import { replaceCategoryLabelToKey, tagInfo } from '../util/categoryMap';

const SCREEN_TITLE = '태그';
const PLACEHOLDER_TEXT = '태그를 선택해 주세요!';

export default function Tag() {
  const {
    detailState: { status },
  } = useDetailManagement();
  const {
    dispatchCategory,
    plannerState: { category },
  } = usePlannerManagementByStatus();
  const dropdownPrevData = {
    key: category,
    label: replaceCategoryLabelToKey(category),
  };

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{SCREEN_TITLE}</ScreenTitle>
        </ContentHeader>
        <Dropdown
          value={status === 'CREATE' ? undefined : dropdownPrevData}
          list={tagInfo}
          placeholder={PLACEHOLDER_TEXT}
          onChange={({ key }) => dispatchCategory(key as CategoryKey)}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
