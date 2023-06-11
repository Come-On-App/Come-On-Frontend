import { View } from 'react-native';
import React from 'react';
import SearchBar from '../search/SearchBar';
import MeetingCreateButton from '../card/button/MeetingCreateButton';
import useStyles from './style';

export default function SearchAndCreateBar() {
  const { container } = useStyles();

  return (
    <View style={container}>
      <SearchBar />
      <MeetingCreateButton />
    </View>
  );
}
