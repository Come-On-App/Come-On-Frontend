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
import useSearchManagement from '@post/hooks/useSearchManagement';
import EmptyCardList from '@post/components/emptyCardList/EmptyCardList';

export default function MeetingDashboard() {
  const {
    searchState: {
      dateRange: { startingDay, endingDay },
    },
  } = useSearchManagement();
  const paramater = {
    dateFrom: startingDay?.dateString,
    dateTo: endingDay?.dateString,
  };
  const { data, status } = useQuery({
    queryKey: [QueryKeys.meetings, paramater],
    queryFn: ({ signal }) => requestGetMeetings(paramater, signal),
  });
  let Content = <View />;

  if (status === 'loading') {
    Content = <LoadingCardList />;
  }

  if (status === 'error') {
    Content = <ServerError />;
  }

  if (data && status === 'success') {
    const isDateRangeSearched = Boolean(paramater.dateFrom);

    Content = renderCardList(data, isDateRangeSearched);
  }

  return (
    <View testID={TestId.post.list}>
      <SearchAndCreateBar />
      {Content}
    </View>
  );
}

function renderCardList(
  data: GetMeetingSliceResponse,
  isDateRangeSearched: boolean,
) {
  const cardListInfo = data.contents.map(generateCardInfo);

  // 특정 범위의 게시물이 없는 경우
  if (_.isEmpty(cardListInfo) && isDateRangeSearched) {
    return <EmptyCardList type="search" />;
  }

  return <CardList payload={cardListInfo} />;
}

/**
 * [헬퍼 함수]
 * API 응답 데이터를 유효한 데이터로 가공한다.
 */
const generateCardInfo = (response: GetMeetingResponse): CardInfo => {
  const isDecided = !_.isEmpty(response.fixedDate);

  return {
    id: response.meetingId,
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
