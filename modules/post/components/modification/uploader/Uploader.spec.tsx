import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import Uploader from './Uploader';

describe('Uploader Compoent', () => {
  test('타이틀과 사진등록 컴포넌트가 올바르게 렌더링 되어야 한다.', () => {
    render(<Uploader isDataLoading={false} />, wrapper);

    expect(screen.getByText('사진 수정')).toBeOnTheScreen();
  });
});
