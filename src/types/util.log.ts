export type Type = 'log' | 'warn' | 'error' | 'table';

export type Option = {
  time: boolean;
  hidden: boolean;
  style?: {
    mode: 'dark' | 'light';
  };
};
