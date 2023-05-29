export enum Tab {
  one = 'TabOne',
  two = 'TabTwo',
  three = 'TabThree',
}

export const options = {
  [Tab.one]: {},
  [Tab.two]: {
    tabBarLabel: '모임입장',
  },
  [Tab.three]: {
    tabBarLabel: '모임관리',
  },
};
