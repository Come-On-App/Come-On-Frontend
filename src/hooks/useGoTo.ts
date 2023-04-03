import { MeetingMode } from '@features/meetingSlice';
import { useNavigation } from '@react-navigation/native';

function useGoToScreen() {
  const navigation = useNavigation();
  const goToCreateMeetingScreen = (mode: MeetingMode, meetingId?: number) =>
    navigation.navigate('CreateMeeting', { mode, meetingId });
  const goToReportPostScreen = (meetingId: number) =>
    navigation.navigate('ReportPost', { meetingId });
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return { goToCreateMeetingScreen, goToReportPostScreen, goBack };
}

export default useGoToScreen;
