import { Icon, makeStyles } from '@rneui/base';
import { Title } from '@screens/meeting/detail/common';
import React from 'react';
import { View } from 'react-native';

type IconTitleProps = {
  iconName: string;
  size: number;
  color: string;
  title: string;
};

function IconTitle({ iconName, size, color, title }: IconTitleProps) {
  const styles = useStyles();

  return (
    <View style={styles.iconTitle}>
      <Icon name={iconName} size={size} color={color} />
      <View style={styles.textContainer}>
        <Title title={title} />
      </View>
    </View>
  );
}

export default IconTitle;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  iconTitle: {
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 5,
  },
}));
