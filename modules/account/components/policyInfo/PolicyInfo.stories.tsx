import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import PolicyInfo from './PolicyInfo';

type Meta = ComponentMeta<typeof PolicyInfo>;

const IconButtonMeta: ComponentMeta<typeof PolicyInfo> = {
  title: 'Account - PolicyInfo',
  component: PolicyInfo,
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
};

export default IconButtonMeta;

export const Defualt: Meta = {
  args: {
    title: '약관 및 정책',
    showIcon: true,
  },
};

export const WithoutIcon: Meta = {
  args: {
    title: '현재 버전 2.0.0',
    showIcon: false,
  },
};
