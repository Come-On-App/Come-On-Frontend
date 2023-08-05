export interface ImeetingNameInput {
  title: string;
  placeholder: string;
  lengthMax: number;
  onInput: (text: string) => void;
  prevMeetingName?: string | null;
  isDataLoading?: boolean;
}
