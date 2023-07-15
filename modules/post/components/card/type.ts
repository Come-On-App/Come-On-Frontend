export interface CardInfo {
  id: number;
  uri: string;
  people: number;
  isDecided: boolean;
  title: string;
  subTitle: {
    userName: string;
    range: {
      startFrom: string;
      endTo: string;
    };
  };
}

export interface Icard {
  payload: CardInfo;
}
