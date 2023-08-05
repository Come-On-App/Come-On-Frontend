import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';
import { ImagePickerAsset } from 'expo-image-picker';
import {
  updateDateRange,
  updateImage,
  updateName,
  init,
  update,
} from '@post/features/post/postSlice';

import { PostState, DateInfo } from '@post/features/post/type';

/**
 * [redux] post 상태, 디스패치를 반환한다.
 */
export default function usePostManagement() {
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.post);
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
