const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const asyncConstants = (constant) => ({
  REQUEST: `${constant}_${REQUEST}`,
  SUCCESS: `${constant}_${SUCCESS}`,
  FAILURE: `${constant}_${FAILURE}`,
});

export const FETCH_CARDS = asyncConstants('@trello/FETCH_CARDS');
export const LOGIN_USER = asyncConstants('@trello/LOGIN_USER');
export const LOGOUT_USER = '@trello/LOGOUT_USER';
export const SET_CONTENT = '@trello/SET_CONTENT';
export const SET_RENDER_AS = '@trello/SET_RENDER_AS';
