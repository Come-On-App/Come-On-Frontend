import React, { memo, useCallback, useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { Alert, View } from 'react-native';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';

import useMeetingMutation from '@hooks/query/useMeetingMutation';
import type {
  CardMenuDisplayProps,
  CardMenuItemProps,
  CardMenuItemsProps,
  CardMenuProps,
  MenuConfig,
} from '@type/component.card';
import { IconButton } from '@components/button/Buttons';
import Font from '@components/Font';
import { useNavigation } from '@react-navigation/native';
import { MeetingMode } from '@features/meetingSlice';
import CardModal from './CardModal';

const MemoMenu = memo(Menu);
const MemoCardMenuItems = memo(CardMenuItems);
const MemoCardMenuList = memo(CardMenuList);

// 카드 우측 상단 메뉴
function CardMenu({ role, meetingId }: CardMenuProps) {
  const styles = useStyles();
  const [menuVisible, setMenuVisible] = useState(false);
  const hideMenu = () => setMenuVisible(false);
  const showMenu = () => setMenuVisible(true);

  return (
    <MemoMenu
      visible={menuVisible}
      anchor={<CardMenuIcon showMenu={showMenu} />}
      onRequestClose={hideMenu}
      style={styles.menu}
    >
      <MemoCardMenuItems role={role} meetingId={meetingId} />
    </MemoMenu>
  );
}

function CardMenuIcon({ showMenu }: CardMenuDisplayProps) {
  const { icon, rightArea } = useStyles();

  return (
    <IconButton
      style={rightArea}
      onPress={showMenu}
      icon={{
        iconName: 'more-vert',
        color: icon.color,
        size: icon.size,
      }}
    />
  );
}

function CardMenuItems({ role, meetingId }: CardMenuItemsProps) {
  const { deleteMeeting } = useMeetingMutation();
  const [codeModal, setCodeModal] = useState(false);
  const navigation = useNavigation();
  const onPressHandler = () =>
    navigation.navigate('CreateMeeting', {
      mode: MeetingMode.edit,
      meetingId,
    });
  const toggleCodeModal = useCallback(() => setCodeModal(prev => !prev), []);
  const menuConfig: MenuConfig[] = [
    { onPress: toggleCodeModal, text: '초대코드 관리', permission: true },
    { onPress: onPressHandler, text: '모임 수정', permission: true },
    {
      onPress: deleteMeeting.bind({}, meetingId),
      text: '모임 탈퇴',
      permission: false,
      style: { color: 'red' },
    },
  ];

  return (
    <View>
      <View>
        <CardModal
          isVisible={codeModal}
          onClose={toggleCodeModal}
          meetingId={meetingId}
        />
      </View>
      <MemoCardMenuList menu={menuConfig} role={role} />
    </View>
  );
}

function CardMenuList({ role, menu }: CardMenuItemProps) {
  const styles = useStyles();

  return (
    <>
      {menu.map(({ onPress, text, permission, style }) => {
        if (role === 'PARTICIPANT' && permission) return null;

        return (
          <View key={text}>
            <MenuItem onPress={onPress}>
              <Font style={[styles.itemFont, style]}>{text}</Font>
            </MenuItem>
            <MenuDivider />
          </View>
        );
      })}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  menu: {
    overflow: 'hidden',
  },
  itemFont: {
    color: theme.grayscale['900'],
    fontSize: theme.textStyles.body2.fontSize,
    lineHeight: theme.textStyles.body2.lineHeight,
    fontWeight: '400',
  },
  icon: {
    color: theme.grayscale['0'],
    size: 24,
  },
  rightArea: {
    height: '100%',
    justifyContent: 'center',
  },
}));

export default memo(CardMenu);
