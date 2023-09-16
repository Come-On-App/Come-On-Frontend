import React from 'react';
import { isEmpty } from 'lodash';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import { useNavigation } from '@react-navigation/native';
import { PostDetailNavigation } from '@post/navigation/type';
import usePlannerManagementByStatus from '@post/hooks/usePlannerManagementByStatus';

const RIGHT_BUTTON_TEXT = '다음';

export default function NextStepButton() {
  const { plannerState } = usePlannerManagementByStatus();
  const navigation = useNavigation<PostDetailNavigation<'PostDetail'>>();

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ConfirmCancelButton
          rightDisabled={isEmpty(plannerState.title)}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.navigate('PostDetailPlannerField')}
          confirmText={RIGHT_BUTTON_TEXT}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
