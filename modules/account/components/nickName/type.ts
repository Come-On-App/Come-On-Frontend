export interface InickName {
  name: string;
  isLoaindg: boolean;
}

export interface IrenderIcon {
  currentInput: string;
  prevName: string;
  onPressRefresh: () => void;
  onPressSubmit: () => void;
}
