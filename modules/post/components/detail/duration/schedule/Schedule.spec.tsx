/* eslint-disable react/jsx-props-no-spreading */

import { describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { render } from '@shared/utils/customRender';
import Schedule from './Schedule';
import { Ischedule } from './type';

describe('Schedule Compoent', () => {
  const range = {
    startFrom: '2023-06-10',
    endTo: '2023-06-20',
  };

  function Component(props: Ischedule) {
    return (
      <NavigationContainer>
        <Schedule {...props} />
      </NavigationContainer>
    );
  }

  test('날짜형식이 올바르게 포맷팅되어 렌더링 되어야 한다.', () => {
    render(
      <Component
        range={range}
        fixedDate={null}
        members={2}
        isHost={false}
      />,
    );

    expect(
      screen.getByText('2023년 06월 10일 ~ 2023년 06월 20일'),
    ).toBeOnTheScreen();
  });

  test('날짜 범위가 동일하다면 하나의 날짜 범위만 포맷팅되어 렌더링 되어야 한다.', () => {
    const equalRange = {
      startFrom: '2023-06-10',
      endTo: '2023-06-10',
    };

    render(
      <Component
        range={equalRange}
        fixedDate={null}
        members={2}
        isHost={false}
      />,
    );

    expect(screen.getByText('2023년 06월 10일')).toBeOnTheScreen();
  });

  test('날짜가 확정되지 않으면 관련 날짜 범위와 관련된 텍스트를 렌더링 되어야 한다.', () => {
    render(
      <Component
        range={range}
        fixedDate={null}
        members={2}
        isHost={false}
      />,
    );

    expect(
      screen.getByText('참석 가능 날짜에 투표해 보세요!'),
    ).toBeOnTheScreen();
  });

  test('날짜가 확정된다면 관련 날짜 범위와 관련된 텍스트를 렌더링 되어야 한다.', () => {
    render(
      <Component
        range={range}
        fixedDate={range}
        members={2}
        isHost={false}
      />,
    );

    expect(screen.getByText('날짜가 확정되었습니다!')).toBeOnTheScreen();
  });
});
