export interface DateContainerProps {
  startTime: string;
  startFrom: string;
  endTo: string;
  onPressLabel: () => void;
  onPressOut: (
    openTime: boolean,
    setOpenTime: React.Dispatch<React.SetStateAction<boolean>>,
    time: string,
  ) => void;
}
