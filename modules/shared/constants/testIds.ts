const TestId = {
  account: {
    myPage: 'TestId__account_myPage',
    avatar: 'TestId__account_avatar',
    signin: 'TestId__account_signin',
    logo: {
      apple: 'TestId__account_logo_apple',
      google: 'TestId__account_logo_googlee',
    },
    modal: {
      accountDeletion: 'TestId__account_modal_accountDeletion',
    },
  },
  connection: {
    code: 'TestId__connection_code',
    codeField: 'TestId__connection_codeField',
  },
  post: {
    report: 'TestId__post_report',
    list: 'TestId__post_list',
    card: 'TestId__post_card',
    skeleton: 'TestId__post_skeleton',
    creator: 'TestId__post_creator',
    modifier: 'TestId__post_modifier',
    dateSelector: 'TestId__post_dateSelector',
    cardList: 'TestId__post_cardList',
    detail: 'TestId__post_detail',
    noteCard: 'TestId__post_noteCard',
    venue: 'TestId__post_venue',
    venueList: 'TestId__post_venueList',
    order: 'TestId__post_order',
    map: 'TestId__post_map',
    modal: {
      calender: 'TestId__post_modal_calender',
      invitation: 'TestId__post_modal_invitation',
      deletion: 'TestId__post_modal_deletion',
      vote: 'TestId__post_modal_vote',
    },
    button: {
      create: 'TestId__post_meeting_create_button',
      searchBar: 'TestId__post_button_searchBar',
      addVenue: 'TestId__post_button_addVenue',
    },
  },
  shared: {
    logo: {
      defulat: 'TestId__connection_logo_defulat',
      error: 'TestId__connection_logo_error',
      robot: 'TestId__connection_logo_robot',
    },
    button: {
      default: 'TestId__shared_button_default',
      icon: 'TestId__shared_button_icon',
    },
    input: {
      codeInput: {
        field: 'TestId__shared_input_codeField',
        cell: 'TestId__shared_input_codeCell',
      },
    },
    avatar: {
      badge: 'TestId__shared_avatar_badge',
    },
    calender: 'TestId__shared_calender',
  },
} as const;

export default TestId;
