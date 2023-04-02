import React from 'react';
import { SearchBar as RneSearchBar, makeStyles } from '@rneui/themed';
import { GestureResponderEvent, Pressable, View } from 'react-native';

import Icon from './Icon';
import type { SearchBarProps } from '../types';

export default function SearchBar(props: SearchBarProps) {
  const styles = useStyles();
  const {
    value,
    fontStyle,
    IconType,
    onChange,
    containerStyle,
    inputContainerStyle,
  } = props;

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
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={[styles.input, inputContainerStyle]}
      style={[styles.font, fontStyle]}
    />
  );
}

interface SearchBarMockProps {
  onPress: (event: GestureResponderEvent) => void;
}

export function SearchBarMock({ onPress }: SearchBarMockProps) {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={styles.searchBarMockContainer}>
        <View style={styles.searchBarMockInputContainer}>
          <Icon
            name="search"
            color={styles.icon.color}
            size={styles.icon.size}
          />
        </View>
      </View>
    </Pressable>
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
  searchBarMockContainer: {
    width: '100%',
    height: 46,
    backgroundColor: theme.grayscale['200'],

    borderRadius: 4,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  searchBarMockInputContainer: {
    marginVertical: 4,
    marginLeft: 10,
    paddingRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
