import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import useKeyboardState from '@shared/hooks/useKeyboardState';
import { PostStatus } from '@post/features/detail/type';
import { EMPTY_STRING } from '@shared/utils';
import { MeetingPlace } from '@post/api/v1/type';
import {
  requestAddMeetingPlace,
  requestUpdateMeetingPlace,
} from '@post/api/v1';
import { QueryKeys } from '@app/api/type';
import { invalidateQueries } from '@app/api/queryClient';
import { PostDetailNavigation } from '@post/navigation/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import usePlannerManagementByStatus from '@post/hooks/usePlannerManagementByStatus';
import { PlannerState } from '@post/features/detail/planner/type';
import useStyles from './style';

const LEFT_BUTTON_TEXT = '뒤로가기';

export default function SubmitButton() {
  const navigation =
    useNavigation<PostDetailNavigation<'PostDetailPlannerField'>>();
  const [isKeyboardOpen] = useKeyboardState();
  const { container } = useStyles(isKeyboardOpen);
  const {
    detailState: { status, postId, cardId },
  } = useDetailManagement();
  const { plannerState, initPlannerState } = usePlannerManagementByStatus();
  const hasEmptyField = plannerState.customModuleFields.some(
    (item) => item.content === EMPTY_STRING,
  );
  const mutationOptions = {
    onSettled: () => {
      initPlannerState();
    },
    onSuccess: () => {
      invalidateQueries(QueryKeys.venueList(postId));
      navigation.reset({
        index: 0,
        routes: [{ name: 'PostDetail' }],
      });
    },
  };
  const addPlaceMutation = useMutation(requestAddMeetingPlace, mutationOptions);
  const updatePlaceMutation = useMutation(
    requestUpdateMeetingPlace,
    mutationOptions,
  );
  const submitHandler = () => {
    const commonPayload = {
      meetingId: postId,
      payload: generatePlaceData(plannerState),
    };

    if (status === 'CREATE') {
      addPlaceMutation.mutate(commonPayload);

      return;
    }

    updatePlaceMutation.mutate({
      ...commonPayload,
      placeId: cardId,
    });
  };
  const isLoading =
    status === 'CREATE'
      ? addPlaceMutation.isLoading
      : updatePlaceMutation.isLoading;

  return (
    <DividerWrapper customStyle={container}>
      <ScreenLayout>
        <ConfirmCancelButton
          leftDisabled={isLoading}
          rightDisabled={isLoading || hasEmptyField || isKeyboardOpen}
          cancelText={LEFT_BUTTON_TEXT}
          confirmText={getButtonText(status, isLoading)}
          onPressLeft={() => navigation.goBack()}
          onPressRight={submitHandler}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}

/**
 * [헬퍼 함수]
 * 형식에 맞는 객체를 반환한다.
 */
function generatePlaceData(plannerState: PlannerState): MeetingPlace {
  const plannerPayload = {
    category: plannerState.category,
    placeName: plannerState.title,
    address: plannerState.subContent,
    memo: JSON.stringify({
      content: plannerState.content,
      fields: plannerState.customModuleFields,
    }),
    // 구글 맵 기능 비활성화 처리
    lat: 0,
    lng: 0,
    googlePlaceId: 'null',
  };

  return plannerPayload;
}

function getButtonText(status: PostStatus, isLoading: boolean) {
  const isCreateStatus = status === 'CREATE';
  const RIGHT_BUTTON_TEXT = '모임 카드 생성하기';
  const RIGHT_BUTTON_EDIT_TEXT = '모임 카드 수정하기';
  const LOADING_TEXT = '모임 카드 생성중...';
  const LOADING_EDIT_TEXT = '모임 카드 수정중...';

  if (isLoading) {
    return isCreateStatus ? LOADING_TEXT : LOADING_EDIT_TEXT;
  }

  return isCreateStatus ? RIGHT_BUTTON_TEXT : RIGHT_BUTTON_EDIT_TEXT;
}
