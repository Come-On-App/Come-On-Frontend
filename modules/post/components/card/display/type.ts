import { IconName } from '@shared/components/icon/type';

export interface IDisplayIcon {
  name: IconName;
}

export interface IDisplay {
  name: IconName;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface IGroupDisplay {
  people: number;
}

export interface IDecisionDisplay {
  isDecided: boolean;
}

export interface ITitle {
  text: string;
}

interface IRage {
  startFrom: string;
  endTo: string;
}

export interface ISubTitle {
  userName: string;
  range: IRage;
}

export interface IBottomHeading {
  title: string;
  subTitle: ISubTitle;
}

export interface ITopHeading {
  people: number;
  isDecided: boolean;
}
