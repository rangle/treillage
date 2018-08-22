import test from 'ava';
import Rules from './rules';

const card = {
  id: '5901b96834bd455486a22657',
  name: 'Lorem Ipsum',
  desc: 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, from a Lorem Ipsum passage.',
  descData: {
    'emoji': {},
  },
};

test('No empty body rule should return the expected error', t => {
  const { noEmptyBody, errors } = new Rules({});
  const emptyBodyCard = {
    ...card,
    desc: '',
  };

  const error = noEmptyBody(emptyBodyCard);

  t.is(error.text, errors.noEmptyBody);
});

test('No empty body rule should return no error (false)', t => {
  const { noEmptyBody } = new Rules({});
  const bodyCard = {
    ...card,
    desc: 'this is a body',
  };

  const error = noEmptyBody(bodyCard);

  t.is(error, false);
});

test('No long card rule should return the expected error',  t => {
  const { maxLength, errors } = new Rules({ maxWordCount: 2 });
  const longCard = {
    ...card,
    name: 'song',
    desc: '99 red balloons',
  };

  const error = maxLength(longCard);

  t.is(error.text, errors.maxLength(4));
});

test('No long card rule should return no error (false)',  t => {
  const { maxLength } = new Rules({ maxWordCount: 2 });
  const shortCard = {
    ...card,
    name: 'song',
    desc: 'two',
  };

  const error = maxLength(shortCard);

  t.is(error, false);
});

test('Single paragraph rule should return the expected error', t => {
  const { singleParagraph, errors } = new Rules({});
  const multiParagraphCard = {
    ...card,
    desc: card.desc.replace(',', '\n\n'),
  };
  const error = singleParagraph(multiParagraphCard);
  t.is(error.text, errors.singleParagraph);
});

test('Single paragraph rule should return no error (false)', t => {
  const { singleParagraph } = new Rules({});
  const singleParagraphCard = {
    ...card,
    desc: 'single paragraph',
  };
  const error = singleParagraph(singleParagraphCard);
  t.is(error, false);
});

test('No mispelled names rule should return the expected error', t => {
  const mispelledName = 'Rickard McClinton';
  const correctName = 'Richard McClintock';
  const otherNames = ['Ricardo Maquinto', 'Richard Lionheart'];
  const { nameCheck, errors } = new Rules({ names: [correctName, ...otherNames] });
  const mispelledCard = {
    ...card,
    desc: card.desc.replace(correctName, mispelledName),
  };

  const error =  nameCheck(mispelledCard);

  const message = `\n  ${mispelledName} - Perhaps you meant: ${correctName}`;
  t.is(error.text, errors.nameCheck(message));
});

test('No mispelled names rule should return no error (false)', t => {
  const correctName = 'Richard McClintock';
  const { nameCheck } = new Rules({ names: [correctName] });

  const error =  nameCheck(card);

  t.is(error, false);
});
