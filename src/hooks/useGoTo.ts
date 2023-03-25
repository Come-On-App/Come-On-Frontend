import { MeetingMode } from '@features/meetingSlice';
import { useNavigation } from '@react-navigation/native';

// eslint-disable-next-line import/prefer-default-export
export function useGoToCreateMeetingScreen(
  mode: MeetingMode,
  meetingId?: number,
) {
  const navigation = useNavigation();
  const goToCreateMeetingScreen = () =>
    navigation.navigate('CreateMeeting', { mode, meetingId });

  return goToCreateMeetingScreen;
}
