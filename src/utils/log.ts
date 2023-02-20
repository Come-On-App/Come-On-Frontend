/* eslint-disable no-console */

import { Option, Type } from '@type/util.log';

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

  return <T>(title: string, value: T) => {
    if (option?.hidden) return undefined;

    if (option?.time) {
      const time = new Date().toLocaleString();

      return print(`%c [${time}] ${title}`, styles, value);
    }

    return print(`%c ${title}`, styles, value);
  };
}

export default generateLog;
