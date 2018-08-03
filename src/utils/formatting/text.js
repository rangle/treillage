import R from 'ramda';

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

export const applyTextFormatting = (card) => R.merge(card, {
  title: card.title || prepare(addPeriodIfMissing(card.name)),
  body: card.desc && prepare(card.desc),
});
