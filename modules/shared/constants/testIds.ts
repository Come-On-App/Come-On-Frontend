const TestId = {
  account: {
    myPage: 'TestId__account_myPage',
  },
  connection: {
    code: 'TestId__connection_code',
  },
  post: {
    list: 'TestId__post_list',
    card: 'TestId__post_card',
    creator: 'TestId__post_creator',
    dateSelector: 'TestId__post_dateSelector',
    cardList: 'TestId__post_cardList',
    detail: 'TestId__post_detail',
    map: 'TestId__post_map',
    button: {
      create: 'TestId__post_meeting_create_button',
      searchBar: 'TestId__post_button_searchBar',
      addVenue: 'TestId__post_button_addVenue',
    },
  },
  shared: {
    button: {
      default: 'TestId__shared_button_default',
      icon: 'TestId__shared_button_icon',
    },
  },
} as const;

export default TestId;
