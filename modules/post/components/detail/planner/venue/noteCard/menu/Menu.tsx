import React from 'react';

import Menu from '@shared/components/menu/Menu';
import { IList } from '@shared/components/menu/type';
import Icon from '@shared/components/icon/Icon';
import useStyle from './style';

export default function NoteCardMenu() {
  const { icon, menuFont } = useStyle();
  const MenuList: IList[] = [
    {
      name: '모임 수정하기',
      onPress: () => null,
    },
    {
      name: '모임 삭제하기',
      onPress: () => null,
      fontStyle: {
        color: 'red',
      },
    },
  ];

  return (
    <Menu
      fontAllStyle={menuFont}
      list={MenuList}
      anchor={<Icon name="more-horiz" size={icon.size} color={icon.color} />}
    />
  );
}
