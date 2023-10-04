export interface IThumbnail {
  uri: string;
  id: number;
  title: string;
  children?: React.ReactNode;
}

export interface IWithTopComponent {
  id: number;
  uri: string;
  people: number;
  isDecided: boolean;
}
