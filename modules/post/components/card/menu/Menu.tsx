import React, { useState } from 'react';
import { View } from 'react-native';

import Menu from '@shared/components/menu/Menu';
import { IList } from '@shared/components/menu/type';
import Icon from '@shared/components/icon/Icon';
import Invitation from '@post/components/invitation/Invitation';
import useStyle from './style';
import { IcardMenu } from './type';

export default function CardMenu({ id }: IcardMenu) {
  const { icon, menuFont, anchorBackground } = useStyle();
  const [showCodeModal, setCodeModal] = useState(false);
  const MenuList: IList[] = [
    {
      name: '초대코드 관리',
      onPress: () => setCodeModal(true),
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
    <View>
      <Menu
        fontAllStyle={menuFont}
        list={MenuList}
        anchor={
          <View style={anchorBackground}>
            <Icon name="more-vert" size={icon.size} color={icon.color} />
          </View>
        }
        modalComponent={
          <View>
            <Invitation
              id={id}
              showModal={showCodeModal}
              onClose={() => setCodeModal(false)}
            />
          </View>
        }
      />
    </View>
  );
}
