import { View } from 'react-native';
import React from 'react';

import Order from './order/Order';
import NoteCard from './noteCard/NoteCard';
import { Ivenue } from './type';
import useStyles from './style';

export default function Venue({ data: { order, info } }: Ivenue) {
  const { container, cNoteCard, cOrder } = useStyles();

  return (
    <View style={container}>
      <View style={cOrder}>
        <Order order={order} />
      </View>
      <View style={cNoteCard}>
        <NoteCard info={info} />
      </View>
    </View>
  );
}
