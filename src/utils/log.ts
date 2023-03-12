/* eslint-disable no-console */

import { Option, Type, Status } from '@type/util.log';

function generateLog(type: Type, option: Option) {
  const print = console[type];
  const style = {
    background: '#222',
    dark: '#bada55',
    light: '#ffffff',
  };
  const mode = option.style?.mode || 'light';
  const color = style[mode];
  const styles = `background: ${style.background}; color: ${color}`;

  return <T>(title: string, value: T, status: Status = 'show') => {
    if (option?.hidden || status === 'hidden') return undefined;

    if (option?.time) {
      const time = new Date().toLocaleString();

      return print(`%c[${time}] ${title}`, styles, value);
    }

    return print(`%c${title}`, styles, value);
  };
}

export default generateLog;

export const log = generateLog('log', {
  time: true,
  hidden: false,
  style: { mode: 'dark' },
});

export const renderingLog = (value: string) => {
  log('[rendering]', value);
};
