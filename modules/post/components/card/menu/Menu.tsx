import React, { useState } from 'react';
import { View } from 'react-native';

import Menu from '@shared/components/menu/Menu';
import { IList } from '@shared/components/menu/type';
import Icon from '@shared/components/icon/Icon';
import Invitation from '@post/components/invitation/Invitation';
import Deletion from '@post/components/deletion/Deletion';
import { useNavigation } from '@react-navigation/native';
import { PostScreenProps } from '@post/navigation/type';
import useStyle from './style';
import { IcardMenu } from './type';

export default function CardMenu({ id = 0 }: IcardMenu) {
  const { icon, menuFont, anchorBackground } = useStyle();
  const [showCodeModal, setCodeModal] = useState(false);
  const [showDeletionModal, setDeletionModal] = useState(false);
  const navigation = useNavigation<PostScreenProps['navigation']>();
  const MenuList: IList[] = [
    {
      name: '초대코드 관리',
      onPress: () => setCodeModal(true),
    },
    {
      name: '모임 수정',
      onPress: (hideMenu) => {
        hideMenu();
        navigation.navigate('MeetingPostModification', { id });
      },
    },
    {
      name: '게시물 신고',
      onPress: (hideMenu) => {
        hideMenu();
        navigation.navigate('MeetingPostReport', { id });
      },
    },
    {
      name: '모임 탈퇴',
      onPress: () => setDeletionModal(true),
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
            <Deletion
              id={id}
              showModal={showDeletionModal}
              onClose={() => setDeletionModal(false)}
            />
          </View>
        }
      />
    </View>
  );
}
