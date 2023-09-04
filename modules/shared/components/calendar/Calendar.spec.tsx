import { afterAll, describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';
import { advanceTo, clear } from 'jest-date-mock';

import { render } from '@shared/utils/customRender';
import TestId from '@shared/constants/testIds';
import Calendar from './Calendar';

afterAll(() => {
  clear();
});

const testID = TestId.shared.calender;

describe('Calendar Compoent', () => {
  const july = 6;

  advanceTo(new Date(2023, july));

  const CURRENT = '2023-7-17';
  const startDayTestID = `${testID}.day_${'2023-07-17'}`;
  const endDayTestID = `${testID}.day_${'2023-07-21'}`;

  test('기존의 선택된 날짜가 존재하지 않는다면 시작 지점을 표시하여 렌더딩 해야 한다.', async () => {
    render(<Calendar current={CURRENT} onDayPress={jest.fn()} />);

    fireEvent.press(screen.getByTestId(startDayTestID));

    expect(
      screen.getByLabelText('월요일 17 7월 2023 period start'),
    ).toBeOnTheScreen();
  });

  test('동일한 Day를 다시 클릭한다면 시작 지점 표시가 없어져야 한다.', () => {
    render(<Calendar current={CURRENT} onDayPress={jest.fn()} />);

    fireEvent.press(screen.getByTestId(startDayTestID));
    // re-event
    fireEvent.press(screen.getByTestId(startDayTestID));

    expect(screen.getByLabelText('월요일 17 7월 2023')).toBeOnTheScreen();
  });

  test('시작 지점을 선택하고 다음 클릭 이벤트는 끝나는 지점을 표시하여 렌더링 해야 한다.', async () => {
    render(<Calendar current={CURRENT} onDayPress={jest.fn()} />);

    fireEvent.press(await screen.findByTestId(startDayTestID));
    fireEvent.press(await screen.findByTestId(endDayTestID));

    expect(
      screen.getByLabelText('금요일 21 7월 2023 period end'),
    ).toBeOnTheScreen();
  });

  test('시작 지점과 끝 지점이 선택되어 있는 상태에서 시작 지점보다 큰 Day는 다시 끝 지점 선택이 가능해야 한다.', () => {
    const targetDay1 = `${testID}.day_${'2023-07-19'}`;
    const targetDay2 = `${testID}.day_${'2023-07-22'}`;
    const targetDay3 = `${testID}.day_${'2023-08-31'}`;

    render(<Calendar current={CURRENT} onDayPress={jest.fn()} />);

    fireEvent.press(screen.getByTestId(startDayTestID));
    fireEvent.press(screen.getByTestId(endDayTestID));
    fireEvent.press(screen.getByTestId(targetDay1));

    expect(
      screen.getByLabelText('수요일 19 7월 2023 period end'),
    ).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId(targetDay2));

    expect(
      screen.getByLabelText('토요일 22 7월 2023 period end'),
    ).toBeOnTheScreen();

    // 다음달 표시
    fireEvent.press(screen.getByTestId(`${testID}.header.rightArrow`));
    fireEvent.press(screen.getByTestId(targetDay3));

    expect(
      screen.getByLabelText('목요일 31 8월 2023 period end'),
    ).toBeOnTheScreen();
  });

  test('시작 지점과 끝 지점이 선택되어 있는 상태에서 시작 지점보다 작은 Day는 다시 시작 지점 선택이 가능해야 한다.', () => {
    const targetDay1 = `${testID}.day_${'2023-07-16'}`;
    const targetDay2 = `${testID}.day_${'2023-06-14'}`;

    render(<Calendar current={CURRENT} onDayPress={jest.fn()} />);
    fireEvent.press(screen.getByTestId(startDayTestID));
    fireEvent.press(screen.getByTestId(endDayTestID));
    fireEvent.press(screen.getByTestId(targetDay1));

    expect(
      screen.getByLabelText('일요일 16 7월 2023 period start'),
    ).toBeOnTheScreen();

    // 이전 달 표시
    fireEvent.press(screen.getByTestId(`${testID}.header.leftArrow`));

    fireEvent.press(screen.getByTestId(targetDay2));

    expect(
      screen.getByLabelText('수요일 14 6월 2023 period start'),
    ).toBeOnTheScreen();
  });

  test('범위가 지정된 상태에서 시작 지점을 다시 클릭한다면 끝나는 지점 표시가 없어져야 한다.', () => {
    render(<Calendar current={CURRENT} onDayPress={jest.fn()} />);

    fireEvent.press(screen.getByTestId(startDayTestID));
    fireEvent.press(screen.getByTestId(endDayTestID));
    fireEvent.press(screen.getByTestId(startDayTestID));

    expect(screen.getByLabelText('금요일 21 7월 2023')).toBeOnTheScreen();
  });

  test('범위가 지정된 상태에서 끝나는 지점을 다시 클릭한다면 시작 지점 표시가 없어져야 한다.', () => {
    render(<Calendar current={CURRENT} onDayPress={jest.fn()} />);

    fireEvent.press(screen.getByTestId(startDayTestID));
    fireEvent.press(screen.getByTestId(endDayTestID));
    fireEvent.press(screen.getByTestId(endDayTestID));

    expect(screen.getByLabelText('월요일 17 7월 2023')).toBeOnTheScreen();
  });

  test('blockLocalEvent 속성을 true로 설정하면 내부 이벤트가 발생하지 않아야 한다.', () => {
    render(
      <Calendar current={CURRENT} onDayPress={jest.fn()} blockLocalEvent />,
    );

    fireEvent.press(screen.getByTestId(startDayTestID));
    fireEvent.press(screen.getByTestId(endDayTestID));

    expect(screen.getByLabelText('월요일 17 7월 2023')).toBeOnTheScreen();
  });
});
