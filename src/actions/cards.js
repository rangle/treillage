import { FETCH_CARDS, SET_MARKDOWN, BOARD_ID } from '../constants';
import trello from '../data/trello';

function makeFetchAction(status, data) {
  return {
    type: FETCH_CARDS,
    payload: {
      status: status,
      data: data,
    },
  };
}

function makeSetMarkdownAction(markdown) {
  return {
    type: SET_MARKDOWN,
    payload: {
      markdown,
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
        .then((markdown) => dispatch(makeSetMarkdownAction(markdown)))
        .catch(apiFailure);
    };

    trello.authorize({
      onSuccess: authenticationSuccess,
      onError: authenticationFailure,
    });

    return makeFetchAction('request');
  };
}
