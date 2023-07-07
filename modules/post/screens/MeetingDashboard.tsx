import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';

import TestId from '@shared/constants/testIds';
import SearchAndCreateBar from '@post/components/search/searchAndCreate/SearchAndCreateBar';
import CardList from '@post/components/cardList/CardList';
import { useQuery } from '@tanstack/react-query';
import { requestGetMeetings } from '@post/api/v2';
import { CardInfo } from '@post/components/card/type';
import { QueryKeys } from '@app/api/type';
import { GetMeetingResponse } from '@post/api/v2/type';

function MeetingDashboard() {
  const { data } = useQuery({
    queryKey: [QueryKeys.meetings],
    queryFn: () => requestGetMeetings(),
  });

  return (
    <View testID={TestId.post.list}>
      <SearchAndCreateBar />
      <CardList payload={data?.contents.map(createCardListPayload)} />
    </View>
  );
}

function createCardListPayload(response: GetMeetingResponse): CardInfo {
  return {
    isDecided: _.isEmpty(response.fixedDate),
    people: response.memberCount,
    subTitle: {
      range: {
        endTo: response.calendarEndTo,
        startFrom: response.calendarStartFrom,
      },
      userName: response.hostUser.nickname,
    },
    title: response.meetingName,
    uri: response.meetingImageUrl,
  };
}

export default MeetingDashboard;
