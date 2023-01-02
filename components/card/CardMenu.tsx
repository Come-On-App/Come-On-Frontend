import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { Alert, Pressable, View } from 'react-native';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';

import Icon from '../Icon';
import Font from '../StyledText';
import { CardMenuDisplayProps, CardMenuProps } from '../../types';
import CardModal from './CardModal';

function CardMenuDisplay({ showMenu, style }: CardMenuDisplayProps) {
  const { icon } = useStyles();

  return (
    <Pressable onPress={showMenu} style={style}>
      <Icon name="more-vert" size={icon.size} color={icon.color} />
    </Pressable>
  );
}

function CardMenuItems() {
  const styles = useStyles();
  const [codeModal, setCodeModal] = useState(false);
  const openCodeModal = () => setCodeModal(true);
  const closeCodeModal = () => setCodeModal(false);
  const onPressHandler = () => Alert.alert('Click!');
  const menus = [
    { onPress: openCodeModal, text: '초대코드 관리' },
    { onPress: onPressHandler, text: '모임 수정' },
    { onPress: onPressHandler, text: '모임 삭제' },
  ];
  const items = menus.map(({ onPress, text }) => (
    <View key={text}>
      <MenuItem onPress={onPress}>
        <Font style={styles.itemFont}>{text}</Font>
      </MenuItem>
      <MenuDivider />
    </View>
  ));

  return (
    <View>
      <View>
        <CardModal isVisible={codeModal} onClose={closeCodeModal} />
      </View>
      {items}
    </View>
  );
}

function CardMenu({ style }: CardMenuProps) {
  const styles = useStyles();
  const [menuVisible, setMenuVisible] = useState(false);
  const hideMenu = () => setMenuVisible(false);
  const showMenu = () => setMenuVisible(true);

  return (
    <Menu
      visible={menuVisible}
      anchor={<CardMenuDisplay showMenu={showMenu} style={style} />}
      onRequestClose={hideMenu}
      style={styles.menu}
    >
      <CardMenuItems />
    </Menu>
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
}));

export default CardMenu;
