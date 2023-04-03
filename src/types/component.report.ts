import { AssetState } from '@type/hook.imagePicker';

export type ReportImageAsset = AssetState | null;

export interface Form {
  reportImageAsset: ReportImageAsset;
  title: string;
  description: string;
  meetingId: number;
}
