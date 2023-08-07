import { OnChangeText } from '@shared/components/input/type';

export interface ImeetingNameInput {
  title: string;
  placeholder: string;
  lengthMax: number;
  onInput: OnChangeText;
  prevMeetingName?: string | null;
  isDataLoading?: boolean;
  multiline?: boolean;
}
