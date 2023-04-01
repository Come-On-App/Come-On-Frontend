import { Calendar } from '@type/meeting.date';

/**
 * 신고 리포트 컴포넌트
 */
export const report = {
  text: {
    image: '캡처 이미지 (선택)',
    title: '제목',
    discription: '신고 내용',
    placeholder: '신고 내용을 작성해주세요.',
    button: '신고하기',
  },
  maxLength: 150,
};

/**
 * 모임 카드 컴포넌트
 */
export const meeting = {
  text: {
    display: {
      totalPeople: (people: number) => `${people}명`,
      decided: (isDecided: boolean) => (isDecided ? '확정' : '미확정'),
      subTitle: (dateRange: {
        calendarStartFrom: string;
        calendarEndTo: string;
      }) => `${dateRange.calendarStartFrom} ~ ${dateRange.calendarEndTo}`,
    },
    empty: {
      button: '모임 등록하러 가기',
      title: '등록된 모임이 없습니다. 모임을 등록해주세요!',
    },
    menu: {
      code: '초대코드 관리',
      edit: '모임 수정',
      report: '게시물 신고',
      delete: '모임 탈퇴',
    },
    modal: {
      emptyCode: '------',
      expiry: '코드가 만료되어 갱신되었습니다!',
      loading: (isLoading: boolean) =>
        isLoading ? '초대코드 확인중...' : '초대코드가 생성됐습니다!',
      copy: '복사해서 사용하세요',
      button: {
        cancel: '닫기',
        copy: '복사하기',
        success: '복사완료!',
      },
    },
    detail: {
      member: '모임멤버',
      date: '모임기간',
      place: '모임장소',
      imageUpload: '사진등록',
      vote: {
        range: (calendar: Calendar) =>
          `${calendar.startFrom} ~ ${calendar.endTo}`,
        button: '날짜 투표하기',
      },
    },
  },
  height: 56,
};
