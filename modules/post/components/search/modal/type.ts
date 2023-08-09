import { Dispatch, SetStateAction } from 'react';

export interface IcalendarModal {
  isOpen: boolean;
  dispatchModalState: Dispatch<SetStateAction<boolean>>;
}
