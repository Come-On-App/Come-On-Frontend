import { describe, expect, test } from '@jest/globals';
import {
  formatPhoneNumber,
  isUrl,
  isPhoneNumber,
  validateUrlFormat,
  validatePhoneNumberFormat,
  validateAndFormatText,
  checkFieldType,
} from './inputFieldUtils';

describe('inputFieldUtils 함수 테스트', () => {
  // formatPhoneNumber 함수 테스트
  test('전화번호가 올바르게 포맷되어야 한다.', () => {
    expect(formatPhoneNumber('01012345678')).toBe('010-1234-5678');
    expect(formatPhoneNumber('0102345678')).toBe('010-234-5678');
    expect(formatPhoneNumber('010-12345678')).toBe('010-1234-5678');
    expect(formatPhoneNumber('010-1234-5678')).toBe('010-1234-5678');
  });

  // isUrl 함수 테스트
  test('URL이 올바르게 검증되어야 한다.', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('http://example.com')).toBe(true);
    expect(isUrl('www.example.com')).toBe(true);
    expect(isUrl('example.com')).toBe(false);
  });

  // isPhoneNumber 함수 테스트
  test('전화번호가 올바르게 검증되어야 한다.', () => {
    expect(isPhoneNumber('010-1234-5678')).toBe(true);
    expect(isPhoneNumber('01012345678')).toBe(true);
    expect(isPhoneNumber('010-1234-567a')).toBe(false);
  });

  // validateUrlFormat 함수 테스트
  test('잘못된 URL에 대해 에러 메시지 반환해야 한다.', () => {
    expect(validateUrlFormat('example')).toBe('URL 형식이 잘못된 것 같습니다.');
    expect(validateUrlFormat('https://example.com')).toBeNull();
  });

  // validatePhoneNumberFormat 함수 테스트
  test('잘못된 전화번호에 대해 에러 메시지 반환해야 한다.', () => {
    expect(validatePhoneNumberFormat('010-1234-567a')).toBe(
      '전화번호 형식이 잘못된 것 같습니다.',
    );
    expect(validatePhoneNumberFormat('010-1234-5678')).toBeNull();
  });

  // validateAndFormatText 함수 테스트
  test('필드 유형에 따라 텍스트 검증 및 포맷해야 한다.', () => {
    const { formattedText, newErrorMessage } = validateAndFormatText(
      '01012345678',
      'TEL',
    );

    expect(formattedText).toBe('010-1234-5678');
    expect(newErrorMessage).toBeNull();

    const { formattedText: ft2, newErrorMessage: ne2 } = validateAndFormatText(
      'example',
      'LINK',
    );

    expect(ft2).toBe('example');
    expect(ne2).toBe('URL 형식이 잘못된 것 같습니다.');
  });

  // checkFieldType 함수 테스트
  test('올바른 필드 유형 플래그 반환', () => {
    const { isLinkType, isTelType, isMultiline } = checkFieldType('LINK');

    expect(isLinkType).toBe(true);
    expect(isTelType).toBe(false);
    expect(isMultiline).toBe(false);
  });
});
