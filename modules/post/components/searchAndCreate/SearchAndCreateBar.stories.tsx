import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import { FontLoader } from '@shared/components/ThemeProvider';
import SearchAndCreateBar from './SearchAndCreateBar';

type Meta = ComponentMeta<typeof SearchAndCreateBar>;

export default {
  title: 'SearchAndCreateBar',
  component: SearchAndCreateBar,
  decorators: [
    (Story) => (
      <FontLoader>
        <View style={{ padding: 10 }}>
          <Story />
        </View>
      </FontLoader>
    ),
  ],
} as Meta;

export const Default: Meta = {};
