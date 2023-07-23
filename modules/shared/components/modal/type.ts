export interface Imodal {
  isVisible: boolean;
  children: React.ReactNode;
  onBackdropPress: () => void;
  testID: string;
}
