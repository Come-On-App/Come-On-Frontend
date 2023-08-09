import { Dispatch, SetStateAction } from 'react';

export interface IcalendarModal {
  isOpen: boolean;
  dispatch: Dispatch<SetStateAction<boolean>>;
}
