import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import App from './App';

describe('<App />', () => {
  test('앱이 실행된다면 네비게이터가 올바르게 동작해야 한다.', () => {
    render(<App />);

    const Component = screen.getByTestId(TestId.post.list);

    expect(Component).toBeOnTheScreen();
    expect(Component).toHaveTextContent('MeetingPostList');
  });
});
