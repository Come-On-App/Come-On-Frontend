import { DropdownPayload } from '@shared/components/dropdown/type';
import { SetStateAction } from 'react';

export interface IFieldDropdown {
  tagDispatcher: (
    dispatch: SetStateAction<DropdownPayload | undefined>,
  ) => void;
}

export interface IAddFieldButton {
  selectedTag: DropdownPayload | undefined;
}
