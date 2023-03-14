/* eslint-disable @typescript-eslint/no-explicit-any */
export type OnError = (error: Error) => void;

export type OnSucess<T> = (received: T) => void;

export interface Option<T> {
  onError: OnError;
  onSucess: OnSucess<T>;
}

export type StartValue<SV> = Exclude<SV, () => any> | (() => Promise<SV>);

export type CallbackFns = ((value: any) => any)[];

export type Options<R> = Partial<Option<R>>;
