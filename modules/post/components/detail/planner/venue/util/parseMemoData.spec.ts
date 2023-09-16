import { describe, expect, test } from '@jest/globals';
import parseMemoData from './parseMemoData';
import { MetaData } from '../../customField/type';

describe('parseMemoData Function', () => {
  test('target이 undefined일 때 기본값을 반환해야 한다.', () => {
    const result = parseMemoData();

    expect(result).toEqual({
      content: '',
      fields: [],
    });
  });

  test('target이 빈 문자열일 때 기본값을 반환해야 한다.', () => {
    const result = parseMemoData('');

    expect(result).toEqual({
      content: '',
      fields: [],
    });
  });

  test('target이 유효한 JSON 문자열일 때 파싱된 content와 fields를 반환해야 한다.', () => {
    const field: MetaData = {
      fieldType: 'TEL',
      label: '전화번호',
      itemKey: 'TEL4',
      content: '010-2563-2563',
    };
    const validJSON = JSON.stringify({
      content: '일부 내용',
      fields: [field],
    });
    const result = parseMemoData(validJSON);

    expect(result).toEqual({
      content: '일부 내용',
      fields: [field],
    });
  });

  test('target이 유효하지 않은 JSON 문자열일 때 target을 content로 하고 빈 fields를 반환해야 한다.', () => {
    const invalidJSON = '유효하지 않은 JSON 문자열';
    const result = parseMemoData(invalidJSON);

    expect(result).toEqual({
      content: invalidJSON,
      fields: [],
    });
  });

  test('target이 JSON 문자열이지만 객체가 아닐 때 기본값을 반환해야 한다.', () => {
    const notAnObject = JSON.stringify('객체가 아님');
    const result = parseMemoData(notAnObject);

    expect(result).toEqual({
      content: '',
      fields: [],
    });
  });
});
