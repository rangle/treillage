export const PASS = 'Looks Good!';

const maxSize = 100;

const errors = {
  maxLength: `This card is over ${maxSize} characters long, please shorten.`,
};

const maxLength = (card) => {
  const size = (card.name + ' ' + card.desc).split(' ').length;

  return size < maxSize ? 'Looks Good!' : errors.maxLength;
};

export default [
  maxLength,
];
