export type ItemProps = {
  children: number;
  handler: React.Dispatch<React.SetStateAction<string>>;
};

export type TimePickerProps = {
  startTime: string;
  onPressOut: (
    openTime: boolean,
    setOpenTime: React.Dispatch<React.SetStateAction<boolean>>,
    time: string,
  ) => void;
};

export type TimePickerListProps = {
  arrayItem: number[];
  setItem: React.Dispatch<React.SetStateAction<string>>;
};
