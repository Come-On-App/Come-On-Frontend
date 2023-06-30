import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import PolicyVersionList from './PolicyVersionList';
import { View } from 'react-native';

type Meta = ComponentMeta<typeof PolicyVersionList>;

const IconButtonMeta: ComponentMeta<typeof PolicyVersionList> = {
  title: 'Account - PolicyVersionList',
  component: PolicyVersionList,
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
  args: {},
};
