import R from 'ramda';

const hasEndOfSentencePunctuation = (string) => '.!?'.indexOf(string.slice(-1)) === -1;

const addPeriodIfMissing = (string) => {
  const trimmed = string.trim();
  return hasEndOfSentencePunctuation(trimmed) ?
    trimmed + '.'
    : trimmed;
};

const replaceApostrophes = (string) => string.replace(/\'/g, '’');

const replaceDoubleQuotes = (string) => string.replace(
  /\"([^\"]*?)\"/g,
  (_, match) => `“${match}”`
);

const prepare = R.pipe(
  replaceDoubleQuotes,
  replaceApostrophes
);

export const hasLabel = (targetLabel) => (card) => R.contains(
  targetLabel,
  R.map((label) => label.name, card.labels || []), // all label names
);

export const addFormatting = (card) => R.merge(card, {
  title: card.title || prepare(addPeriodIfMissing(card.name)),
  body: card.desc && prepare(card.desc),
});

export const makeSectionCard = (list) => ({
  section: 'heading',
  title: list.name.split('/')[0],
  byline: list.name.split('/')[1],
});

export const makeHighlights = (lists) => {
  const highlightCards = R.filter(hasLabel('HIGHLIGHT'), lists);
  if (highlightCards.length > 0) {
    lists.unshift({
      section: 'highlight',
      title: 'Headlines',
      cardTitles: highlightCards.map(card => card.name),
    });
  }
  return lists;
};
