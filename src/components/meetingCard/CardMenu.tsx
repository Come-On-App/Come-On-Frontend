import React, { memo, useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { View } from 'react-native';
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
import { MeetingMode } from '@features/meetingSlice';
import useGoToScreen from '@hooks/useGoTo';
import { meeting } from '@constants/config';
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
      <MemoCardMenuItems
        role={role}
        meetingId={meetingId}
        hideMenu={hideMenu}
      />
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

const { menu: textMenu } = meeting.text;

function CardMenuItems({ role, meetingId, hideMenu }: CardMenuItemsProps) {
  const { deleteMeeting } = useMeetingMutation();
  const [codeModal, setCodeModal] = useState(false);
  const { goToCreateMeetingScreen, goToReportPostScreen } = useGoToScreen();
  const toggleCodeModal = () => {
    setCodeModal(prev => !prev);
  };
  const goToEditScreen = () => {
    hideMenu();
    goToCreateMeetingScreen(MeetingMode.edit, meetingId);
  };
  const goToReportScreen = () => {
    hideMenu();
    goToReportPostScreen(meetingId);
  };
  const deletePost = () => {
    hideMenu();
    deleteMeeting(meetingId);
  };
  const menuConfig: MenuConfig[] = [
    { onPress: toggleCodeModal, text: textMenu.code, permission: true },
    { onPress: goToEditScreen, text: textMenu.edit, permission: true },
    {
      onPress: goToReportScreen,
      text: textMenu.report,
      permission: false,
    },
    {
      onPress: deletePost,
      text: textMenu.delete,
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
