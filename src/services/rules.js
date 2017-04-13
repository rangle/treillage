const maxSize = 100;

const pass = 'Looks Good!';
const errors = {
  maxLength: `This card is over ${maxSize} characters long, please shorten.`,
};

const maxLength = (card) => {
  const size = (card.name + ' ' + card.desc).split(' ').length;

  return size < maxSize ? pass : errors.maxLength;
};

export default [
  maxLength,
];
