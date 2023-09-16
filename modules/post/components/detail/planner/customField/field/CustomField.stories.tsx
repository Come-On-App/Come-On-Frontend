import { ComponentMeta } from '@storybook/react-native';

import Component from './CustomField';

type Meta = ComponentMeta<typeof Component>;

export default {
  title: 'Detail - Planner',
  component: Component,
} as Meta;

export const IndependentComponentLink: Meta = {
  args: {
    metaData: {
      fieldType: 'LINK',
      label: '링크',
      itemKey: 'LINK',
      content: '',
    },
  },
};

export const IndependentComponentText: Meta = {
  args: {
    metaData: {
      fieldType: 'TEXT',
      label: '텍스트',
      itemKey: 'TEXT',
      content: '',
    },
  },
};

export const IndependentComponentLongText: Meta = {
  args: {
    metaData: {
      fieldType: 'NOTE',
      label: '메모',
      itemKey: 'NOTE',
      content: '',
    },
  },
};

export const IndependentComponentPhoneNumber: Meta = {
  args: {
    metaData: {
      fieldType: 'TEL',
      label: '전화번호',
      itemKey: 'TEL',
      content: '',
    },
  },
};
