import {
  GetDateVotingListResponse,
  GetMeetingPlaceListResponse,
} from '@post/api/v1/type';

const [ONE, TWO, THREE, FOUR] = [1, 2, 3, 4] as const;

export const meetingPlaceListResponse = {
  [ONE]: {
    contentsCount: 1,
    contents: [
      {
        order: 1,
        meetingPlaceId: 1,
        category: 'BAR',
        placeName: '사당포차',
        memo: '{"content":"공지 참고하기~","fields":[{"fieldType":"TEXT","label":"공지사항","itemKey":"TEXT3","content":"오늘 비오니 우산 챙기도록"},{"fieldType":"TEL","label":"가게 전화번호","itemKey":"TEL2","content":"025859289"},{"fieldType":"LINK","label":"참고 블로그 주소!","itemKey":"LINK1","content":"https://m.blog.naver.com/young_925/221771739665"}]}',
        address: '사당역 2번 출구',
        lat: 0,
        lng: 0,
        googlePlaceId: 'null',
      },
    ],
  },
  [TWO]: {
    contentsCount: 2,
    contents: [
      {
        order: 1,
        meetingPlaceId: 1,
        category: 'ACCOMMODATION',
        memo: '{"content":"숙소 정보 카드","fields":[{"fieldType":"TEL","label":"숙소 전화번호","itemKey":"TEL7","content":"010-0000-0000"},{"fieldType":"TEXT","label":"만나는시간","itemKey":"TEXT5","content":"오후 8시 용산역"},{"fieldType":"NOTE","label":"숙소 설명","itemKey":"NOTE4","content":"게스트 이용 가능 공간/시설\\n* 에어컨, 선풍기, 와이파이,냉장고, 전자레인지, 2구 가스레인지, 에어프라이어, 기본식기 및 잔, 와인오프너 구비"},{"fieldType":"LINK","label":"숙소 링크","itemKey":"LINK2","content":"https://www.airbnb.co.kr/rooms/926638381418918258?adults=1&category_tag=Tag%3A8536&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=1688325730&search_mode=flex_destinations_search&check_in=2023-11-04&check_out=2023-11-09&source_impression_id=p3_1694784041_ucHGuasBW0J8dD1%2F&previous_page_section_name=1000&federated_search_id=cf8fa357-3489-4300-b845-80a87fbfc3a9"}]}',
        placeName: '숙박은 여기',
        address: '사당역 2번 출구',
        lat: 0,
        lng: 0,
        googlePlaceId: 'null',
      },
      {
        order: 2,
        meetingPlaceId: 2,
        category: 'CAFE',
        placeName: '스타벅스',
        memo: '{"content":"","fields":[]}',
        address: '사당역 2번 출구',
        lat: 0,
        lng: 0,
        googlePlaceId: 'null',
      },
    ],
  },
  [THREE]: {
    contentsCount: 0,
    contents: [],
  },
  [FOUR]: {
    contentsCount: 0,
    contents: [],
  },
} as {
  [Key in string]: GetMeetingPlaceListResponse;
};
