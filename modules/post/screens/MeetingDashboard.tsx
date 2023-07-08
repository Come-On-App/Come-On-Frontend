import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';

import TestId from '@shared/constants/testIds';
import { useQuery } from '@tanstack/react-query';
import { requestGetMeetings } from '@post/api/v2';

import { GetMeetingResponse, GetMeetingSliceResponse } from '@post/api/v2/type';
import { CardInfo } from '@post/components/card/type';
import { QueryKeys } from '@app/api/type';

import SearchAndCreateBar from '@post/components/search/searchAndCreate/SearchAndCreateBar';
import CardList from '@post/components/cardList/CardList';
import ServerError from '@post/components/serverError/ServerError';
import LoadingCardList from '@post/components/loadingCardList/LoadingCardList';

function MeetingDashboard() {
  const { data, status } = useQuery({
    queryKey: [QueryKeys.meetings],
    queryFn: () => requestGetMeetings(),
  });
  let Content = <View />;

  if (status === 'loading') {
    Content = <LoadingCardList />;
  }

  if (status === 'error') {
    Content = <ServerError />;
  }

  if (data && status === 'success') {
    Content = renderCardList(data);
  }

  return (
    <View testID={TestId.post.list}>
      <SearchAndCreateBar />
      {Content}
    </View>
  );
}

function renderCardList(data: GetMeetingSliceResponse) {
  const createCardListPayload = (response: GetMeetingResponse): CardInfo => {
    const isDecided = !_.isEmpty(response.fixedDate);

    return {
      isDecided,
      people: response.memberCount,
      subTitle: {
        range: isDecided
          ? // 정렬 알고리즘 구현하거나 순서를 startFrom, endTo 형태로 배치할것
            {
              startFrom: response.fixedDate?.startFrom as string,
              endTo: response.fixedDate?.endTo as string,
            }
          : {
              startFrom: response.calendarStartFrom,
              endTo: response.calendarEndTo,
            },
        userName: response.hostUser.nickname,
      },
      title: response.meetingName,
      uri: response.meetingImageUrl,
    };
  };
  const cardListPayload = data.contents.map(createCardListPayload);

  return <CardList payload={cardListPayload} />;
}

export default MeetingDashboard;
