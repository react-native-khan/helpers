import {BEGIN, END} from './type';

export const begin = () => dispatch => {
  dispatch({type: BEGIN});
};

export const end = () => dispatch => {
  dispatch({type: END});
};

export const setLoading =
(timer = 1000) =>
dispatch => {
  dispatch(beginLoading());
  setTimeout(() => {
    dispatch(endLoading());
  }, timer);
};
