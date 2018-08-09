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

test('No empty body rule', t => {
  const { noEmptyBody, errors } = new Rules({});
  const emptyBodyCard = {
    ...card,
    desc: '',
  };

  const error = noEmptyBody(emptyBodyCard);

  t.is(error.text, errors.noEmptyBody);
});

test('No long card rule',  t => {
  const { maxLength, errors } = new Rules({ maxWordCount: 2 });
  const longCard = {
    ...card,
    name: 'song',
    desc: '99 red balloons',
  };

  const error = maxLength(longCard);

  t.is(error.text, errors.maxLength(4));
});

test('Single paragraph rule', t => {
  const { singleParagraph, errors } = new Rules({});
  const multiParagraphCard = {
    ...card,
    desc: card.desc.replace(',', '\n\n'),
  };
  const error = singleParagraph(multiParagraphCard);
  t.is(error.text, errors.singleParagraph);
});

test('No mispelled names rule', t => {
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

test('Valid card should pass all rules', t => {
  const { list } = new Rules({});
  t.plan(list.length);

  list.forEach(rule => {
    const error = rule(card);

    t.falsy(error);
  });
});
