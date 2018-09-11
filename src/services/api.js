import R from 'ramda';
import Promise from 'bluebird';
import moment from 'moment';

import { applyTextFormatting } from '../utils/formatting/text';
import Rules from './rules';

const get = (path) => new Promise((resolve, reject) => {
  Trello.get(path, resolve, reject);
});

const applyRules = (card) => {
  if (card.isSectionHeading) {
    return {
      ...card,
      suggestions: [],
    };
  }

  const { rules } = new Rules({});

  return Promise.all(rules.map(rule => {
    return Promise.resolve(rule(card))
      .then(error => error);
  }))
    .then((errors) => {
      return {
        ...card,
        suggestions: errors.filter(Boolean),
      };
    });
};

const getAuthUser = () => {
  return Trello.rest('GET', 'members/me')
    .then(
      me => me,
      error => console.error(error));
};

const getActions = (card) => {
  // Filter by weekly actions? add &field=date&since=${lastMonday}
  // const lastMonday = moment().startOf('isoWeek').format('YYYY-MM-DD').toString();

  return get(`/cards/${card.id}/actions?filter=commentCard%2CcreateCard`)
    .then(actions => actions,
      error => console.error(error));
};

const filterByEditor = async(lists) => {
  // Assume the auth user is an editor
  const editor = await getAuthUser();

  return lists.filter(list => new RegExp(editor.fullName).test(list.name));
};

const filterByMention = async(list) => {
  const user = await getAuthUser();

  return Promise.filter(list, async(card) => {
    if (!card.isSectionHeading) {
      try {
        const actions = await getActions(card);
        const match = actions.length > 0 && actions.filter(action => action.idMemberCreator === user.id);

        return match.length > 0;
      } catch (error) {
        console.error(error);
      }
    }
    return null;
  })
    .then(filtered => filtered);
};

const filterSectionByApprovedCardsOnly = async(list) => {
  return list.filter((el, i) => {
    // checks
    return !(((i + 1) === list.length && el.isSectionHeading) || (list[i].isSectionHeading && list[i + 1].isSectionHeading));
  });
};

const addAttachmentURLs = (card) => {
  if (!card.idAttachmentCover) return card;

  return get(`/cards/${card.id}/attachments/${card.idAttachmentCover}`)
    .then(attachment => R.merge(card, {
      image: attachment.url,
    }));
};

const makeSectionCard = (list) => ({
  isSectionHeading: true,
  title: list.name.split('/')[0],
  byline: list.name.split('/')[1],
});

const getList = (list) => get(`/lists/${list.id}/cards`)
  .then((cards) => cards.length ?
    R.flatten([makeSectionCard(list), cards])
    : []
  );

const hasLabel = (targetLabel) => (card) => R.contains(
  targetLabel,
  R.map((label) => label.name, card.labels || []), // all label names
);

const getMyCards = R.pipeP(
  (boardId) => get(`/boards/${boardId}/lists`),
  R.filter((list) => list.name[0] !== '#'),
  R.map(getList),
  Promise.all,
  R.flatten,
  R.filter((card) => card.isSectionHeading || hasLabel('APPROVED BY EDITOR')),
  R.reject(hasLabel('HOLD')),
  filterByMention,
  R.map(addAttachmentURLs),
  Promise.all,
  R.map(applyRules),
  Promise.all,
  R.map(applyTextFormatting),
);

const getMySection = R.pipeP(
  (boardId) => get(`/boards/${boardId}/lists`),
  R.filter((list) => list.name[0] !== '#'),
  filterByEditor,
  R.map(getList),
  Promise.all,
  R.flatten,
  R.filter((card) => card.isSectionHeading || hasLabel('APPROVED BY EDITOR')),
  R.reject(hasLabel('HOLD')),
  filterSectionByApprovedCardsOnly,
  R.map(addAttachmentURLs),
  Promise.all,
  R.map(applyRules),
  Promise.all,
  R.map(applyTextFormatting),
);

const getAllCards = R.pipeP(
  (boardId) => get(`/boards/${boardId}/lists`),
  R.filter((list) => list.name[0] !== '#'),
  R.map(getList),
  Promise.all,
  R.flatten,
  R.filter((card) => card.isSectionHeading || hasLabel('APPROVED BY EDITOR')),
  R.reject(hasLabel('HOLD')),
  filterSectionByApprovedCardsOnly,
  R.map(addAttachmentURLs),
  Promise.all,
  R.map(applyRules),
  Promise.all,
  R.map(applyTextFormatting),
);

const authorize = ({ onSuccess, onFailure }) => {
  /* eslint no-console: 0 */
  console.log('Authorizing trello');
  Trello.authorize({
    type: 'popup',
    name: 'Newsletter Generator',
    scope: {
      read: true,
      write: true,
    },
    expiration: 'never',
    success: onSuccess,
    error: onFailure,
  });
};

const updateCard = (id) => {
  const comment = {
    text: `Validated on ${ moment().format('MMMM Do YYYY, h:mm:ss a') }`,
  };

  const success = successMsg => {
    console.log('Posted comment to card', successMsg);
  };

  const error = errorMsg => {
    console.log(`error: ${errorMsg}`);
  };

  Trello.post(`/cards/${id}/actions/comments/`, comment, success, error);
};

export {
  getMyCards,
  getMySection,
  getAllCards,
  authorize,
  updateCard,
};
