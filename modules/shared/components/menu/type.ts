export interface IMenu {
  anchor: React.ReactNode;
  list: {
    name: string;
    onPress: () => void;
  }[];
}
