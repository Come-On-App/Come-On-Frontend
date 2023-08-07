import { useCallback, useReducer } from 'react';
import { ImagePickerAsset } from 'expo-image-picker';

import { OnImage } from '@post/components/imageUploader/type';

export interface ReportState {
  asset: ImagePickerAsset | null;
  title: string | null;
  content: string | null;
}

type ReportAction =
  | { type: 'REPORT_UPDATE_IMAGE'; payload: ImagePickerAsset | null }
  | { type: 'REPORT_UPDATE_TITLE'; payload: string | null }
  | { type: 'REPORT_UPDATE_CONTENT'; payload: string | null };

type ReportDispatch = {
  image: OnImage;
  title: (payload: string) => void;
  content: (payload: string) => void;
};

/**
 * report 상태, 디스패치를 반환한다.
 */
export default function useReportManagement(): [ReportState, ReportDispatch] {
  // 초기 상태
  const initialState: ReportState = {
    asset: null,
    title: null,
    content: null,
  };

  // 리듀서 함수
  function reducer(state: ReportState, action: ReportAction) {
    switch (action.type) {
      case 'REPORT_UPDATE_IMAGE':
        return { ...state, image: action.payload };
      case 'REPORT_UPDATE_TITLE':
        return { ...state, title: action.payload };
      case 'REPORT_UPDATE_CONTENT':
        return { ...state, content: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const image = useCallback(
    (payload: ImagePickerAsset) => {
      dispatch({ type: 'REPORT_UPDATE_IMAGE', payload });
    },
    [dispatch],
  );
  const title = useCallback(
    (payload: string) => {
      dispatch({
        type: 'REPORT_UPDATE_TITLE',
        payload: payload === '' ? null : payload,
      });
    },
    [dispatch],
  );
  const content = useCallback(
    (payload: string) => {
      dispatch({
        type: 'REPORT_UPDATE_CONTENT',
        payload: payload === '' ? null : payload,
      });
    },
    [dispatch],
  );

  return [state, { image, title, content }];
}
