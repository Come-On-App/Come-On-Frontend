import { DropdownKey } from '@shared/components/dropdown/type';
import { MetaData } from '../customField/type';

export interface IFieldContent {
  content: string;
  type: DropdownKey;
}

export interface IFieldDisplay {
  field: MetaData;
}

export interface ContentField {
  content: string;
}
