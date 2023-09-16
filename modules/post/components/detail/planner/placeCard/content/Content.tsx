import React, { useRef } from 'react';

import PostInput from '@post/components/postInput/PostInput';
import { RNEInputRefObject } from '@shared/components/input/type';
import usePlannerManagementByStatus from '@post/hooks/usePlannerManagementByStatus';

const INPUT_CONFIG = {
  TITLE: { TEXT: '*제목', MAX_LENGTH: 15, PLACEHOLDER: '제목을 입력하세요.' },
  SUMMARY: {
    TEXT: '요약',
    MAX_LENGTH: 17,
    PLACEHOLDER: '간단한 요약을 작성해 보세요.',
  },
  SUB_CONTENT: {
    TEXT: '서브 내용',
    MAX_LENGTH: 20,
    PLACEHOLDER: '추가 정보도 입력해 보세요.',
  },
};
const KEEP_KEYBOARD_ACTIVE = false;

export default function Content() {
  const { dispatchTitle, dispatchContent, dispatchSubContent, plannerState } =
    usePlannerManagementByStatus();
  const titleInputRef = useRef(null);
  const summaryInputRef = useRef(null);
  const subContentInputRef = useRef(null);
  const focusNextInput = (nextInputRef: RNEInputRefObject) => {
    if (nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  return (
    <>
      <PostInput
        ref={titleInputRef}
        lengthMax={INPUT_CONFIG.TITLE.MAX_LENGTH}
        onInput={dispatchTitle}
        title={INPUT_CONFIG.TITLE.TEXT}
        prevPayload={plannerState.title}
        onSubmitEditing={() => focusNextInput(summaryInputRef)}
        blurOnSubmit={KEEP_KEYBOARD_ACTIVE}
        placeholder={INPUT_CONFIG.TITLE.PLACEHOLDER}
        returnKeyType="next"
      />
      <PostInput
        ref={summaryInputRef}
        lengthMax={INPUT_CONFIG.SUMMARY.MAX_LENGTH}
        onInput={dispatchContent}
        title={INPUT_CONFIG.SUMMARY.TEXT}
        prevPayload={plannerState.content}
        onSubmitEditing={() => focusNextInput(subContentInputRef)}
        blurOnSubmit={KEEP_KEYBOARD_ACTIVE}
        placeholder={INPUT_CONFIG.SUMMARY.PLACEHOLDER}
        returnKeyType="next"
      />
      <PostInput
        ref={subContentInputRef}
        lengthMax={INPUT_CONFIG.SUB_CONTENT.MAX_LENGTH}
        onInput={dispatchSubContent}
        title={INPUT_CONFIG.SUB_CONTENT.TEXT}
        prevPayload={plannerState.subContent}
        placeholder={INPUT_CONFIG.SUB_CONTENT.PLACEHOLDER}
        onSubmitEditing={() => focusNextInput(subContentInputRef)}
      />
    </>
  );
}
