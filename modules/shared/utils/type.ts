export interface IFormatDateRange {
  startFrom: string;
  endTo?: string;
}

export type formatType = 'ko';

export type IapplyRelativeSizes = (
  sizes:
    | {
        [styleProps: string]: number;
      }
    | number[],
) => number[];
