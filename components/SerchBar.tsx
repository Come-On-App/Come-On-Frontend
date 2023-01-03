import React from 'react';
import { SearchBar, makeStyles } from '@rneui/themed';

import Icon from '../components/Icon';
import { SerchBarProps } from '../types';

function SerchBar({ IconType, value, onChange }: SerchBarProps) {
  const styles = useStyles();

  return (
    <SearchBar
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
      style={styles.font}
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
    fontFamily: 'pretendard-Regular',
  },
  icon: {
    color: theme.grayscale['700'],
    size: 20,
  },
}));

export default SerchBar;
