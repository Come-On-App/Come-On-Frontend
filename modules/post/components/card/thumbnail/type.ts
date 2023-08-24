export interface IThumbnail {
  uri: string;
  id: number;
  children?: React.ReactNode;
}

export interface IWithTopComponent {
  id: number;
  uri: string;
  people: number;
  isDecided: boolean;
}
