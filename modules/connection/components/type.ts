import { Dispatch, SetStateAction } from 'react';

export type Status = {
  isError: boolean;
  isLoading: boolean;
  errorMessage: string;
};

export type JoinStatusDispatch = Dispatch<SetStateAction<Status>>;

export type CodeDispatch = Dispatch<SetStateAction<string>>;
