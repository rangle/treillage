const ok = 'Checks passed.';
const maxSize = 100;

const errors = {
  maxLength: `This card is over ${maxSize} characters long, please shorten.`,
};

const maxLength = (card) => {
  const size = (card.name + ' ' + card.desc).split(' ').length;

  return size < maxSize ? ok : errors.maxLength;
};

export const PASS = ok;

export default [
  maxLength,
];
