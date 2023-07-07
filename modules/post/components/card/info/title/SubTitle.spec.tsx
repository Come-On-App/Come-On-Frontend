import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import { wrapper } from '@shared/utils/customRender';
import SubTitle from './SubTitle';

describe('SubTitle Compoent', () => {
  test('전달된 속성으로 올바르게 렌더링 되어야 한다.', () => {
    const subTitle1 = '여행마스터';
    const subTitle2 = {
      startFrom: '2023-06-10',
      endTo: '2023-06-20',
    };

    render(<SubTitle userName={subTitle1} range={subTitle2} />, wrapper);

    expect(screen.getByText(subTitle1)).toBeOnTheScreen();
    expect(screen.getByText('2023.06.10 ~ 2023.06.20')).toBeOnTheScreen();
  });
});
