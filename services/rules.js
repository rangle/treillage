const ok = 'Checks passed.';
const maxSize = 100;

const errors = {
  maxLength: `This card is over ${maxSize} characters long, please shorten.`,
  noEmptyBody: 'This card\'s description is empty.',
};

const noEmptyBody = (card) => card.desc.length === 0 && errors.noEmptyBody;

const maxLength = (card) => {
  const size = (card.name + ' ' + card.desc).split(' ').length;

  return size > maxSize && errors.maxLength;
};

export const PASS = ok;

export default [
  noEmptyBody,
  maxLength,
];
