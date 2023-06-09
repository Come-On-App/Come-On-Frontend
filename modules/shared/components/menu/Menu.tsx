import { Menu as MaterialMenu, MenuItem } from 'react-native-material-menu';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { vigilAsync } from 'promise-vigilant';

import { IMenu } from './type';

export default function Menu({ anchor, list = [] }: IMenu) {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <MaterialMenu
      visible={visible}
      onRequestClose={hideMenu}
      anchor={<Pressable onPress={showMenu}>{anchor}</Pressable>}
    >
      {list.map(({ name, onPress }) => {
        return (
          <MenuItem onPress={() => vigilAsync(hideMenu, [onPress])} key={name}>
            {name}
          </MenuItem>
        );
      })}
    </MaterialMenu>
  );
}
