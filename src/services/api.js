import R from 'ramda';
import Q from 'q';
import moment from 'moment';

import rules from './rules';

const get = (path) => new Promise((resolve, reject) => {
  Trello.get(path, resolve, reject);
});

const replaceDoubleQuotes = (string) => string.replace(
  /\"([^\"]*?)\"/g,
  (_, match) => `“${match}”`
);

const replaceApostrophes = (string) => string.replace(/\'/g, '’');

const prepare = R.pipe(
  replaceDoubleQuotes,
  replaceApostrophes
);

const hasEndOfSentencePunctuation = (string) => '.!?'.indexOf(string.slice(-1)) === -1;

const addPeriodIfMissing = (string) => {
  const trimmed = string.trim();
  return hasEndOfSentencePunctuation(trimmed) ?
    trimmed + '.'
    : trimmed;
};

const validate = (card) => {
  rules.forEach(rule => {
    const message = rule(card);
    card.message = message;
  });
  return card;
};

const addFormatting = (card) => R.merge(card, {
  title: card.title || prepare(addPeriodIfMissing(card.name)),
  body: card.desc && prepare(card.desc),
});

const addAttachmentURLs = (card) => {
  if (card.idAttachmentCover) {
    return get(`/cards/${card.id}/attachments/${card.idAttachmentCover}`)
      .then(attachment => R.merge(card, {
        image: attachment.url,
      }));
  }
  return Q.when(card);
};

// const formatCard = (card) => card.isSectionHeading ?
//   `## ${card.title}\n\n_Section edited by [[${card.byline}]]_.`
//   : `__${prepare(addPeriodIfMissing(card.name))}__ ${prepare(card.desc)}`;

const log = (heading) => (item) => {
  /* eslint no-console: 0 */
  console.log(heading, item);
  return item;
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

const getCards = R.pipeP(
  (boardId) => get(`/boards/${boardId}/lists`),
  log('Got results'),
  R.filter((list) => list.name[0] !== '#'),
  R.map(getList),
  (listOfPromises) => Promise.all(listOfPromises),
  R.flatten,
  R.reject(hasLabel('Hold')),
  R.map(validate),
  R.map(addFormatting),
  R.map(addAttachmentURLs),
  Q.all,
  log('Final'),
  // (renderedCards) => renderedCards.join('\n\n'),
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

export default {
  getCards,
  authorize,
  updateCard,
};
