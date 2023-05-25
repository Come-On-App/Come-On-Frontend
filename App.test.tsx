import React from 'react';
import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import App from './App';

describe('<App />', () => {
  test('renders Hello World message on the home page', () => {
    render(<App />);

    expect(
      screen.getByText('Open up App.tsx to start working on your app!')
    ).toBeOnTheScreen();
  });
});
