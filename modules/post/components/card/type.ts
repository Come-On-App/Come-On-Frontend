export interface Icard {
  payload: {
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
  };
}
