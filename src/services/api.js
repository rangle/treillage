import R from 'ramda';
import Q from 'q';

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

const getEditor = () => {
  return Trello.rest('GET', 'members/me')
  .then(
    me => me,
    error => console.error(error));
};

const filterByEditor = async (lists) => {
  const editor = await getEditor();

  return lists.filter(list => new RegExp(editor.fullName).test(list.name));
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

// const log = (heading) => (item) => {
//   /* eslint no-console: 0 */
//   console.log(heading, item);
//   return item;
// };

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
  (lists) => (filterByEditor(lists)),
  R.map(getList),
  (listOfPromises) => Promise.all(listOfPromises),
  R.flatten,
  R.reject(hasLabel('HOLD')),
  R.map(validate),
  R.map(addFormatting),
  R.map(addAttachmentURLs),
  Q.all,
);

const getAllCards = R.pipeP(
  (boardId) => get(`/boards/${boardId}/lists`),
  R.filter((list) => list.name[0] !== '#'),
  R.map(getList),
  (listOfPromises) => Promise.all(listOfPromises),
  R.flatten,
  R.reject(hasLabel('HOLD')),
  R.map(validate),
  R.map(addFormatting),
  R.map(addAttachmentURLs),
  Q.all,
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

export {
  getAllCards,
  getMyCards,
  authorize,
};
