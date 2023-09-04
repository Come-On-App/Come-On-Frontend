import { random } from 'lodash';

export default () => {
  return `https://picsum.photos/500/500?random=${random(1, 100)}`;
};
