/* eslint-disable no-console */

function GenerateLog(
  type: 'log' | 'warn' | 'error' | 'table',
  option?: {
    time: boolean;
    hidden: boolean;
  },
) {
  const print = console[type];

  return <T>(title: string, value: T) => {
    if (option?.hidden) return undefined;

    if (option?.time) {
      const time = new Date().toLocaleString();

      return print(`[${time}] ${title}`, value);
    }

    return print(`${title}`, value);
  };
}

export default GenerateLog;
