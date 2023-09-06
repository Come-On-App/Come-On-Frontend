import { CategoryType } from './category/type';

export interface NoteCardInfo {
  title: string;
  content: string;
  address: string;
  type: CategoryType;
}

export interface INoteCard {
  info: NoteCardInfo;
  showRightIcon?: boolean;
}
