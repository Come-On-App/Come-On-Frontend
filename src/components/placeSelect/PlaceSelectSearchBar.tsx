import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import type { PlaceSelectNavigation } from '@type/navigation';
import type { SearchTitleProps } from '@type/component.placeselect';
import { BoldFont } from '@components/Font';
import { SearchBarMock } from '@components/SearchBar';

export default function PlaceSelectSearchBar() {
  return (
    <View>
      <SearchTitle />
      <Search />
    </View>
  );
}

export function SearchTitle({ style }: SearchTitleProps) {
  const SEARCH_TITLE = '장소검색';
  const styles = useStyles();

  return (
    <View style={[styles.titleContainer, style]}>
      <BoldFont style={styles.searchText}>{SEARCH_TITLE}</BoldFont>
    </View>
  );
}

function Search() {
  const navigation = useNavigation<PlaceSelectNavigation>();
  const onPressHandler = () => navigation.navigate('Map');

  return <SearchBarMock onPress={onPressHandler} />;
}

const useStyles = makeStyles(theme => ({
  titleContainer: {
    marginVertical: 12,
  },
  searchText: {
    fontSize: 16,
    lineHeight: 22,
  },
  searchBarText: {
    color: theme.grayscale['900'],
  },
}));
