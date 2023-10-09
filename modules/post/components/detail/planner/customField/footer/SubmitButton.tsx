import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ConfirmCancelButton from '@shared/components/button/ConfirmCancelButton';
import { PostStatus } from '@post/features/detail/type';
import { EMPTY_STRING } from '@shared/utils';
import { MeetingPlace } from '@post/api/v1/type';
import {
  requestAddMeetingPlace,
  requestUpdateMeetingPlace,
} from '@post/api/v1';
import { PostDetailNavigation } from '@post/navigation/type';
import useDetailManagement from '@post/hooks/useDetailManagement';
import usePlannerManagementByStatus from '@post/hooks/usePlannerManagementByStatus';
import { PlannerState } from '@post/features/detail/planner/type';
import useRestrictNavigation from '@shared/hooks/useRestrictNavigation';
import { hapticSuccess } from '@shared/utils/haptics';
import { noop } from 'lodash';

const LEFT_BUTTON_TEXT = '뒤로가기';
const TOAST_CONFIG_CREATE = {
  type: 'success',
  text1: '새로운 카드를 성공적으로 생성하였습니다 🎉',
  text2: '알찬 구성으로 카드를 만들었나요?',
};
const TOAST_CONFIG_UPDATE = {
  type: 'success',
  text1: '카드를 성공적으로 업데이트하였습니다 🎉',
  text2: '카드 내용이 훨씬 보기 좋아요!',
};

export default function SubmitButton() {
  const navigation =
    useNavigation<PostDetailNavigation<'PostDetailPlannerField'>>();
  const {
    detailState: { status, postId, cardId },
  } = useDetailManagement();
  const { plannerState, initPlannerState } = usePlannerManagementByStatus();
  const hasEmptyField = plannerState.customModuleFields.some(
    (item) => item.content === EMPTY_STRING,
  );
  const mutationOptions = {
    onSuccess: () => {
      Toast.show(
        status === 'CREATE' ? TOAST_CONFIG_CREATE : TOAST_CONFIG_UPDATE,
      );

      initPlannerState();

      navigation.reset({
        index: 0,
        routes: [{ name: 'PostDetail' }],
      });

      return status === 'CREATE' ? hapticSuccess() : noop();
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

  useRestrictNavigation(isLoading);

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ConfirmCancelButton
          leftDisabled={isLoading}
          rightDisabled={isLoading || hasEmptyField}
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
  const plannerPayload: MeetingPlace = {
    category: plannerState.category,
    placeName: plannerState.title,
    address: plannerState.subContent,
    memo: JSON.stringify({
      content: plannerState.content,
      fields: plannerState.customModuleFields,
    }),
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
