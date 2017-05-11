import test from 'ava';
import Rules from './rules';

const card = {
  id: '5901b96834bd455486a22657',
  name: 'Lorem Ipsum',
  desc: `Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.`,
  descData: {
    'emoji': {},
  },
};

test('No empty body rule', t => {
  const { noEmptyBody, errors } = new Rules({ names: [] });
  const emptyBodyCard = {
    ...card,
    desc: '',
  };

  const error = noEmptyBody(emptyBodyCard);

  t.is(error.text, errors.noEmptyBody);
});

test('No long card rule',  t => {
  const { maxLength, errors } = new Rules({ maxSize: 70, names: []});
  const longCard = {
    ...card,
    desc: card.desc + card.desc,
  };

  const error = maxLength(longCard);

  t.is(error.text, errors.maxLength);
});

test('Single paragraph rule', t => {
  const { singleParagraph, errors } = new Rules({ names: []});
  const multiParagraphCard = {
    ...card,
    desc: card.desc.replace(',', '\n'),
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

  const message = `${mispelledName} - Perhaps you meant: ${correctName}`;
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
