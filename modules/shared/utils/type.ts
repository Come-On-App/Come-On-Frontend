export interface IFormatDateRange {
  startFrom: string;
  endTo: string;
}

export type formatType = 'ko';

export type IapplyRelativeSizes = (
  sizes:
    | {
        [s: string]: number;
      }
    | number[],
) => number[];
