export interface ICardInfo {
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
  isHost: boolean;
}

export interface ICard {
  payload: ICardInfo;
}
