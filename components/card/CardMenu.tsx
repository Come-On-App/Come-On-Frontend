import React from 'react';
import { makeStyles } from '@rneui/themed';
import { Alert, Pressable, View } from 'react-native';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';

import Icon from '../Icon';
import Font from '../StyledText';
import { CardMenuDisplayProps, CardMenuProps } from '../../types';

function CardMenuDisplay({ showMenu, style }: CardMenuDisplayProps) {
  const iconProps = {
    color: '#FFFFFF',
    size: 24,
  };

  return (
    <Pressable onPress={showMenu} style={style}>
      <Icon name="more-vert" size={iconProps.size} color={iconProps.color} />
    </Pressable>
  );
}

function CardMenuItems() {
  const onPressHandler = () => {
    Alert.alert('Click!');
  };
  const styles = useStyles();
  const menus = [
    { onPress: onPressHandler, text: '초대코드 관리' },
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

  return <View>{items}</View>;
}

function CardMenu({ style, menuState }: CardMenuProps) {
  const [visible, setVisible] = menuState;
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <Menu
      visible={visible}
      anchor={<CardMenuDisplay showMenu={showMenu} style={style} />}
      onRequestClose={hideMenu}
      style={{
        overflow: 'hidden',
      }}
    >
      <CardMenuItems />
    </Menu>
  );
}

const useStyles = makeStyles(theme => ({
  itemFont: {
    color: theme.grayscale['900'],
    fontSize: theme.textStyles.body2.fontSize,
    lineHeight: theme.textStyles.body2.lineHeight,
    fontWeight: '400',
  },
}));

export default CardMenu;
