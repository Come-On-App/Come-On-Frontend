import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { View } from 'react-native';
import TestId from '@shared/constants/testIds';
import DividerWrapper from './DividerWrapper';
import { render } from '../../utils/customRender';

describe('DividerWrapper Compoent', () => {
  test('Divider 컴포넌트가 렌더링 되어야 한다.', () => {
    render(
      <DividerWrapper position="top">
        <View />
      </DividerWrapper>,
    );

    expect(screen.getByTestId('RNE__Divider')).toBeOnTheScreen();

    render(
      <DividerWrapper position="bottom">
        <View />
      </DividerWrapper>,
    );

    expect(screen.getByTestId('RNE__Divider')).toBeOnTheScreen();

    render(
      <DividerWrapper position="both">
        <View />
      </DividerWrapper>,
    );

    expect(screen.getAllByTestId('RNE__Divider')).toHaveLength(2);

    render(
      <DividerWrapper position="none">
        <View />
      </DividerWrapper>,
    );

    expect(screen.getByTestId(TestId.shared.divider.none)).toBeOnTheScreen();
  });
});
