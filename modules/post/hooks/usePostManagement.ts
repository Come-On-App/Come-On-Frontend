import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import type { ImagePickerAsset } from 'expo-image-picker';

import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';
import {
  updateDateRange,
  updateImage,
  updateName,
  init,
  update,
} from '@post/features/post/postSlice';

import type { PostState } from '@post/features/post/type';
import type { DateInfo } from '@shared/components/calendar/type';

/**
 * [redux] post 상태, 디스패치를 반환한다.
 */
export default function usePostManagement() {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.post, shallowEqual);
  const dispatchImage = useCallback(
    (asset: ImagePickerAsset) => dispatch(updateImage({ uri: null, asset })),
    [dispatch],
  );
  const dispatchName = useCallback(
    (input: string) => {
      // 빈문자열 null 치환
      dispatch(updateName(input || null));
    },
    [dispatch],
  );
  const dispatchDateRange = useCallback(
    (startingDay: DateInfo, endingDay: DateInfo) => {
      const newPayload = {
        startingDay,
        endingDay,
      };

      dispatch(updateDateRange(newPayload));
    },
    [dispatch],
  );
  const dispatchPayload = useCallback(
    (payload: Partial<PostState>) => {
      dispatch(update(payload));
    },
    [dispatch],
  );
  const initPostState = useCallback(() => dispatch(init()), [dispatch]);

  return {
    postState,
    dispatchImage,
    dispatchName,
    dispatchDateRange,
    initPostState,
    dispatch: dispatchPayload,
  };
}
