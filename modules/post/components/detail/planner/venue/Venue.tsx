import { View } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import { ExtendedMeetingPlace } from '@post/api/v1/type';
import Order from './order/Order';
import NoteCard from './card/NoteCard';
import { IVenue } from './type';
import useStyles from './style';
import { NoteCardInfo } from './card/type';
import parseMemoData from './util/parseMemoData';

export default function Venue({ data, showRightIcon = true }: IVenue) {
  const { container, cNoteCard, cOrder } = useStyles();

  return (
    <View style={container} testID={TestId.post.venue}>
      <View style={cOrder}>
        <Order order={data.order} />
      </View>
      <View style={[cNoteCard]}>
        <NoteCard info={generateCardData(data)} showRightIcon={showRightIcon} />
      </View>
    </View>
  );
}

function generateCardData(data: ExtendedMeetingPlace): NoteCardInfo {
  const { content, fields } = parseMemoData(data.memo);

  return {
    type: data.category,
    title: data.placeName,
    address: data.address,
    placeId: data.meetingPlaceId,
    content,
    fields,
  };
}
