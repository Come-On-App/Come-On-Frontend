import { describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import TestId from '@shared/constants/testIds';
import { render } from '@shared/utils/customRender';
import { NavigationContainer } from '@react-navigation/native';
import MeetingPostViewer from './MeetingPostViewer';

describe('MeetingPostViewer Compoent', () => {
  const Component = (
    <NavigationContainer>
      <MeetingPostViewer
        navigation={jest.fn() as any}
        route={{ params: { id: 0 } } as any}
      />
    </NavigationContainer>
  );

  test('모임 상세 정보가 올바르게 렌더링 되어야 한다.', () => {
    render(Component);

    expect(screen.getByText('모임 멤버')).toBeOnTheScreen();
    expect(screen.getByText('모임 기간')).toBeOnTheScreen();
    expect(screen.getByText('모임 장소')).toBeOnTheScreen();
    expect(screen.getByTestId(TestId.post.detail)).toBeOnTheScreen();
  });
});
