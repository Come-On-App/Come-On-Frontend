import { OnLayout } from '@shared/components/layout/type';
import { OnFocus } from '@shared/components/input/type';
import { MetaData } from '../type';

export interface ITitle {
  metaData: MetaData;
  onFocus?: OnFocus;
}

export interface IDeleteButton {
  itemKey: string;
}

export interface IContent {
  metaData: MetaData;
  onFocus?: OnFocus;
}

export interface ICustomFieldEditor {
  metaData: MetaData;
  onLayout: OnLayout;
  onFocus?: OnFocus;
}
