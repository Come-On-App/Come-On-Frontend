import { Dispatch, SetStateAction } from 'react';

export interface IentranceInput {
  code: string;
  dispatch: Dispatch<SetStateAction<string>>;
}
