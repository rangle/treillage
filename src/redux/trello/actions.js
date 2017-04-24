import { FETCH_CARDS, SET_CONTENT, BOARD_ID } from '../constants';
import { authorize, getMyCards, getMySection, getAllCards } from '../../services/api';

function makeFetchAction(status, data) {
  return {
    type: FETCH_CARDS,
    payload: {
      status: status,
      data: data,
    },
  };
}

function makeSetContentAction(content) {
  return {
    type: SET_CONTENT,
    payload: {
      content,
    },
  };
}

export function fetchMyCards() {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch(makeFetchAction('authError'));

    const apiFailure = (error) =>
      dispatch(makeFetchAction('apiError', error));

    const authenticationSuccess = () => {
      dispatch(makeFetchAction('authenticated'));
      getMyCards(BOARD_ID)
        .then((content) => dispatch(makeSetContentAction(content)))
        .catch(apiFailure);
    };
    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });

    return makeFetchAction('request');
  };
}

export function fetchMySection() {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch(makeFetchAction('authError'));

    const apiFailure = (error) =>
      dispatch(makeFetchAction('apiError', error));

    const authenticationSuccess = () => {
      dispatch(makeFetchAction('authenticated'));
      getMySection(BOARD_ID)
        .then((content) => dispatch(makeSetContentAction(content)))
        .catch(apiFailure);
    };
    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });

    return makeFetchAction('request');
  };
}

export function fetchAllCards() {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch(makeFetchAction('authError'));

    const apiFailure = (error) =>
      dispatch(makeFetchAction('apiError', error));

    const authenticationSuccess = () => {
      dispatch(makeFetchAction('authenticated'));
      getAllCards(BOARD_ID)
        .then((content) => dispatch(makeSetContentAction(content)))
        .catch(apiFailure);
    };

    authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });

    return makeFetchAction('request');
  };
}
