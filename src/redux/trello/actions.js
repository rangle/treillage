import { FETCH_CARDS, SET_CONTENT, BOARD_ID } from '../constants';
import trello from '../../services/api';

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

export function fetchCards() {
  return (dispatch) => {
    const authenticationFailure = () =>
      dispatch(makeFetchAction('authError'));

    const apiFailure = (error) =>
      dispatch(makeFetchAction('apiError', error));

    const authenticationSuccess = () => {
      dispatch(makeFetchAction('authenticated'));
      trello.getCards(BOARD_ID)
        .then((content) => dispatch(makeSetContentAction(content)))
        .catch(apiFailure);
    };

    trello.authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });

    return makeFetchAction('request');
  };
}
