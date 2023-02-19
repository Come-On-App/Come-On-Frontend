export type ItemProps = {
  children: number;
  handler: React.Dispatch<React.SetStateAction<string>>;
};

export type TimePickerProps = {
  onPressOut: (
    openTime: boolean,
    setOpenTime: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
};

export type TimePickerListProps = {
  arrayItem: number[];
  setItem: React.Dispatch<React.SetStateAction<string>>;
};
