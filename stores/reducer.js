import {BEGIN, END} from './type';

const INITIAL_STATE = {
  loading: false,
};

export const dependency = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BEGIN:
      return {...state, loading: true};
    case END:
      return {...state, loading: false};
    default:
      return state;
  }
};
