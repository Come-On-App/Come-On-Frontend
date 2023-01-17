import { View } from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '@rneui/themed';

import { BoldFont } from '../Font';
import SearchBar from '../SearchBar';

export default function PlaceSelectSearchBar() {
  return (
    <View>
      <SearchTitle />
      <Search />
    </View>
  );
}

function Search() {
  const styles = useStyles();
  const [search, setSearch] = useState('용산');
  const updateSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <SearchBar
      value={search}
      IconType="search"
      onChange={updateSearch}
      style={styles.searchBarText}
    />
  );
}

function SearchTitle() {
  const SEARCH_TITLE = '장소검색';
  const styles = useStyles();

  return (
    <View style={styles.titleContainer}>
      <BoldFont style={styles.searchText}>{SEARCH_TITLE}</BoldFont>
    </View>
  );
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
