import { CategoryKey } from '@post/api/v2/type';
import { MetaData } from '../../customField/type';

export interface NoteCardInfo {
  title: string;
  content: string;
  address: string;
  type: CategoryKey;
  fields: MetaData[];
  placeId: number;
}

export interface INoteCard {
  info: NoteCardInfo;
  showRightIcon?: boolean;
}
