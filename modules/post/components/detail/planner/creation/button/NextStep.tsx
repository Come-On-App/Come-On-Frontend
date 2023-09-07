import React from 'react';
import { isEmpty } from 'lodash';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import usePlannerManagement from '@post/hooks/usePlannerManagement';
import { useNavigation } from '@react-navigation/native';
import { PostNavigation } from '@post/navigation/type';

const RIGHT_BUTTON_TEXT = '다음';

export default function NextStepButton() {
  const { plannerState } = usePlannerManagement();
  const navigation = useNavigation<PostNavigation<'MeetingPlanner'>>();

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ConfirmCancelButton
          rightDisabled={isEmpty(plannerState.title)}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => null}
          confirmText={RIGHT_BUTTON_TEXT}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
