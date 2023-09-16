import React, { useEffect, useRef, useState } from 'react';
import { isString } from 'lodash';

import Input from '@shared/components/input/Input';
import usePlannerManagement from '@post/hooks/usePlannerManagementByStatus';
import {
  keyboardTypeMapping,
  placeholderTypeMapping,
  validateAndFormatText,
} from './util/inputFieldUtils';
import { IContent } from './type';

function Content({ metaData: { content, itemKey, fieldType } }: IContent) {
  const [currentContent, updateContent] = useState(content);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    validateAndFormatText(content, fieldType).newErrorMessage,
  );
  const { dispatchUpdateField, dispatchFieldStatus } = usePlannerManagement();
  const handleTextChange = (text: string) => {
    const { formattedText, newErrorMessage } = validateAndFormatText(
      text,
      fieldType,
    );

    setErrorMessage(newErrorMessage);
    updateContent(formattedText);
  };
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    dispatchFieldStatus(isString(errorMessage));
  }, [dispatchFieldStatus, errorMessage]);

  useEffect(() => {
    if (currentContent === content) return;

    dispatchUpdateField({ content: currentContent, itemKey });
  }, [content, currentContent, dispatchUpdateField, itemKey]);

  return (
    <Input
      errorMessage={
        currentContent && (errorMessage === null ? undefined : errorMessage)
      }
      placeholder={placeholderTypeMapping[fieldType]}
      text={currentContent}
      onChangeText={handleTextChange}
      keyboardType={keyboardTypeMapping[fieldType]}
      multiline={fieldType === 'NOTE'}
    />
  );
}

export default Content;
