import { CalendarAction, CalendarState } from './type';

export const [UPDATE_DAYS, UPDATE_STARTING_DAY, UPDATE_ENDING_DAY] = [
  'UPDATE_DAYS',
  'UPDATE_STARTING_DAY',
  'UPDATE_ENDING_DAY',
] as const;

// Reducer 함수 정의
export const calendarReducer = (
  state: CalendarState,
  action: CalendarAction,
): CalendarState => {
  switch (action.type) {
    case UPDATE_DAYS:
      return {
        ...state,
        startingDay: action.payload.startingDay,
        endingDay: action.payload.endingDay,
      };
    case UPDATE_STARTING_DAY:
      return {
        ...state,
        startingDay: action.payload.startingDay,
      };
    case UPDATE_ENDING_DAY:
      return {
        ...state,
        endingDay: action.payload.endingDay,
      };
    default:
      return state;
  }
};

export const initialState: CalendarState = {
  startingDay: null,
  endingDay: null,
};
