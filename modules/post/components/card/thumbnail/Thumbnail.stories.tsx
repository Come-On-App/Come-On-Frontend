import { View } from 'react-native';
import { ComponentMeta } from '@storybook/react-native';

import FontThemeProvider from '@shared/provider/FontProvider';
import Thumbnail from './Thumbnail';
import { IWithTopComponent } from './type';
import TopHeading from '../info/heading/TopHeading';

const path =
  'https://images.unsplash.com/photo-1682687220067-dced9a881b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80';

type Meta = ComponentMeta<typeof Thumbnail>;

export default {
  title: 'Card - Thumbnail',
  component: Thumbnail,
  decorators: [
    (Story) => (
      <FontThemeProvider>
        <View style={{ margin: 10 }}>
          <Story />
        </View>
      </FontThemeProvider>
    ),
  ],
  args: {
    uri: path,
    people: 999,
    isDecided: true,
  },
} as Meta;

export const Default: Meta = {
  args: {
    uri: path,
  },
};

export const WithTopComponent = (args: IWithTopComponent) => {
  return (
    <Thumbnail uri={args.uri}>
      <TopHeading {...args} />
    </Thumbnail>
  );
};
