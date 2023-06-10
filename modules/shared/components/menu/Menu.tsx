import {
  Menu as MaterialMenu,
  MenuDivider,
  MenuItem,
} from 'react-native-material-menu';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { vigilAsync } from 'promise-vigilant';

import { IMenu } from './type';
import Font from '../font/Font';

/**
 * Menu 컴포넌트
 *
 * @porp anchor - 메뉴를 표시할 앵커 요소
 * @prop fontAllStyle - 모든 메뉴 항목에 적용될 글꼴 스타일
 * @prop list - 메뉴 항목의 배열
 */
export default function Menu({ anchor, fontAllStyle, list = [] }: IMenu) {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View>
      <MaterialMenu
        visible={visible}
        onRequestClose={hideMenu}
        anchor={<Pressable onPress={showMenu}>{anchor}</Pressable>}
      >
        {list.map(({ name, onPress, fontStyle }) => {
          return (
            <View key={name}>
              <MenuItem onPress={() => vigilAsync(hideMenu, [onPress])}>
                <Font style={[fontAllStyle, fontStyle]}>{name}</Font>
              </MenuItem>
              <MenuDivider />
            </View>
          );
        })}
      </MaterialMenu>
    </View>
  );
}
