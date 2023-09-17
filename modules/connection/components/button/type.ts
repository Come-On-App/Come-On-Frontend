import { CodeDispatch, JoinStatusDispatch } from '@connection/components/type';

export interface ICodeEntryButton {
  code: string;
  dispatch: JoinStatusDispatch;
  codeDispatch: CodeDispatch;
}
