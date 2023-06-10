import React from 'react';
import { View } from 'react-native';

import Menu from '@shared/components/menu/Menu';
import { IList } from '@shared/components/menu/type';
import Icon from '@shared/components/icon/Icon';
import useStyle from './style';

export default function CardMenu() {
  const { icon, menuFont, anchorBackground } = useStyle();
  const MenuList: IList[] = [
    {
      name: '초대코드 관리',
      onPress: () => null,
    },
    {
      name: '모임 수정',
      onPress: () => null,
    },
    {
      name: '게시물 신고',
      onPress: () => null,
    },
    {
      name: '모임 탈퇴',
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
      anchor={
        <View style={anchorBackground}>
          <Icon name="more-vert" size={icon.size} color={icon.color} />
        </View>
      }
    />
  );
}
