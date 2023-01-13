import React from 'react';
import { SearchBar as RneSearchBar, makeStyles } from '@rneui/themed';

import Icon from '../components/Icon';
import type { SearchBarProps } from '../types';

export default function SearchBar({
  value,
  style,
  IconType,
  onChange,
}: SearchBarProps) {
  const styles = useStyles();

  return (
    <RneSearchBar
      value={value}
      onChangeText={onChange}
      searchIcon={
        <Icon
          name={IconType}
          color={styles.icon.color}
          size={styles.icon.size}
        />
      }
      containerStyle={styles.container}
      inputContainerStyle={styles.input}
      style={[styles.font, style]}
    />
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.grayscale['200'],
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 4,
    paddingHorizontal: 0,
  },
  input: {
    backgroundColor: theme.grayscale['200'],
    height: 30,
  },
  font: {
    color: theme.grayscale['700'],
    fontSize: theme.textStyles.body1.fontSize,
    fontFamily: 'pretendard-regular',
  },
  icon: {
    color: theme.grayscale['700'],
    size: 20,
  },
}));
