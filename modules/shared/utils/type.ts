export interface IformatDateRange {
  startFrom: string;
  endTo?: string | null;
}

export type IconvertStringToDateInfos =
  | {
      startFrom: string;
      endTo: string;
    }
  | undefined;

export type formatType = 'ko';

export type IapplyRelativeSizes = (
  sizes:
    | {
        [styleProps: string]: number;
      }
    | number[],
) => number[];

export type AssetState = {
  name: string;
  type: string;
  uri: string;
};
