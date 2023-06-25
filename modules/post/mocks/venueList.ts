import { NoteCardInfo } from '@post/components/detail/planner/venue/noteCard/type';
import { Ivenue } from '@post/components/detail/planner/venue/type';

export default [
  {
    order: 1,
    info: {
      title: '용산역',
      content: '오전 8시에 모여!',
      address: '서울특별시 마포구 망원동',
      type: '음식점',
    },
  },
  {
    order: 2,
    info: {
      title: '긴 텍스트 #####################################',
      content: '먼저 자는 사람이 술값내기~',
      address: '서울특별시 마포구 망원동',
      type: '은행',
    },
  },
  {
    order: 3,
    info: {
      title: '서울역',
      content: '텍스트##',
      address: '긴 텍스트 #####################################',
      type: '기타',
    },
  },
  {
    order: 4,
    info: {
      title: '홍대입구역',
      content: '긴 텍스트#######################################',
      address: '서울특별시 마포구 망원동',
      type: '음식점',
    },
  },
] as Ivenue[];
