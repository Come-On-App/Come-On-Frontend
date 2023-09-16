import React from 'react';
import { isEmpty } from 'lodash';

import { FullScreenWrapper } from '@shared/components/layout/Spacer';
import usePlannerManagement from '@post/hooks/usePlannerManagementByStatus';

export default function EmptyFullScreen() {
  const { plannerState } = usePlannerManagement();

  return (
    <FullScreenWrapper isHide={isEmpty(plannerState.customModuleFields)} />
  );
}
