import { isEmpty } from 'lodash';
import { KeyboardTypeOptions } from 'react-native';
import * as Linking from 'expo-linking';

import { DropdownKey } from '@shared/components/dropdown/type';

export const keyboardTypeMapping = {
  LINK: 'url',
  TEL: 'number-pad',
  TEXT: 'default',
  NOTE: 'default',
} as { [Key in string]: KeyboardTypeOptions };

export const placeholderTypeMapping = {
  LINK: 'https://example.com',
  TEL: '010-1234-5678',
  TEXT: '텍스트를 입력하세요',
  NOTE: '노트를 작성하세요',
} as { [Key in string]: string };

export const checkFieldType = (fieldType: DropdownKey) => {
  const isMultiline = fieldType === 'NOTE';
  const isLinkType = fieldType === 'LINK';
  const isTelType = fieldType === 'TEL';

  return {
    isMultiline,
    isLinkType,
    isTelType,
  };
};

export const formatPhoneNumber = (phoneNumber: string) => {
  // '-'를 제거하고 숫자만 추출
  const numbersOnly = phoneNumber.replace(/-/g, '');
  // 두 가지 형태의 전화번호를 고려한 정규식
  const match = numbersOnly.match(/^(\d{3})(\d{3,4})(\d{4})$/);

  if (match) {
    // 그룹 1: 첫 3자리, 그룹 2: 중간 3~4자리, 그룹 3: 마지막 4자리
    const part1 = match[1];
    const part2 = match[2];
    const part3 = match[3];

    // 중간 부분이 3자리인 경우와 4자리인 경우를 구분
    return part2.length === 3
      ? `${part1}-${part2}-${part3}`
      : `${part1}-${part2}-${part3}`;
  }

  // 일치하는 형식이 없으면 원래 번호 반환
  return phoneNumber;
};

export const convertToHTTPS = (url: string) => {
  if (url.startsWith('www.')) {
    return `https://${url}`;
  }

  return url;
};

export const isUrl = (text: string) => {
  const regex = /^(www\.|https?:\/\/)/;

  return regex.test(text);
};

export const isPhoneNumber = (text: string) => {
  const regex = /^[\d-]+$/; // 숫자와 '-'만 허용

  return regex.test(text);
};

export const validateUrlFormat = (text: string) => {
  const ERROR_MESSAGE = 'URL 형식이 잘못된 것 같습니다.';
  const isNotUrl = !isUrl(text);

  if (isNotUrl) {
    return ERROR_MESSAGE;
  }

  return null;
};

export const validatePhoneNumberFormat = (text: string) => {
  const ERROR_MESSAGE = '전화번호 형식이 잘못된 것 같습니다.';
  const isNotPhoneNumber = !isPhoneNumber(text);

  if (isNotPhoneNumber) {
    return ERROR_MESSAGE;
  }

  return null;
};

export function validateAndFormatText(text: string, fieldType: DropdownKey) {
  const { isLinkType, isTelType } = checkFieldType(fieldType);
  let formattedText = text;
  let newErrorMessage: string | null = null;

  // 공백인 경우
  if (isEmpty(text)) {
    return { formattedText, newErrorMessage };
  }

  // URL 유효성 검사
  if (isLinkType) {
    newErrorMessage = validateUrlFormat(text);

    return { formattedText, newErrorMessage };
  }

  // 전화번호 유효성 검사 및 포맷팅
  if (isTelType) {
    formattedText = formatPhoneNumber(text);
    newErrorMessage = validatePhoneNumberFormat(formattedText);

    return { formattedText, newErrorMessage };
  }

  return { formattedText, newErrorMessage };
}

export const handleLinking = async (
  scheme: 'https' | 'tel',
  content: string,
  validator: (target: string) => boolean,
) => {
  const url =
    scheme === 'https' ? convertToHTTPS(content) : `${scheme}:${content}`;
  const canOpen = validator(content) && (await Linking.canOpenURL(url));

  if (canOpen) {
    await Linking.openURL(url);
  }
};
