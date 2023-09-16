import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { render } from '@shared/utils/customRender';
import Content from './Content';

describe('AddPlanner Compoent', () => {
  test('PostInput fields가 올바르게 렌더링 되어야 한다.', () => {
    render(<Content />);

    // 제목 필드 테스트
    const titleInput = screen.getByPlaceholderText('제목을 입력하세요.');

    expect(titleInput).toBeTruthy();

    // 요약 필드 테스트
    const summaryInput =
      screen.getByPlaceholderText('간단한 요약을 작성해 보세요.');

    expect(summaryInput).toBeTruthy();

    // 서브 내용 필드 테스트
    const subContentInput =
      screen.getByPlaceholderText('추가 정보도 입력해 보세요.');

    expect(subContentInput).toBeTruthy();
  });
});
