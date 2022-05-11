import {BEGIN, END} from './type';

export const beginLoading = () => dispatch => {
  dispatch({type: BEGIN});
};

export const endLoading = () => dispatch => {
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
