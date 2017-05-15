import test from 'ava';
import Rules from './rules';

const card = {
  id: '5901b96834bd455486a22657',
  name: 'Lorem Ipsum',
  desc: `[[Richard McClintock]], a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.`,
  descData: {
    'emoji': {},
  },
};
const mockDictionary = {
  fullnames: ['Richard McClintock'],
  nicknames: {
    rich: 'Richard McClintock',
  },
};

test('No empty body rule', t => {
  const { noEmptyBody, errors } = new Rules({ dictionary: mockDictionary });
  const emptyBodyCard = {
    ...card,
    desc: '',
  };

  const error = noEmptyBody(emptyBodyCard);

  t.is(error.text, errors.noEmptyBody);
});

test('No long card rule',  t => {
  const { maxLength, errors } = new Rules({ maxSize: 70, dictionary: mockDictionary });
  const longCard = {
    ...card,
    desc: card.desc + card.desc,
  };

  const error = maxLength(longCard);

  t.is(error.text, errors.maxLength);
});

test('Single paragraph rule', t => {
  const { singleParagraph, errors } = new Rules({ dictionary: mockDictionary });
  const multiParagraphCard = {
    ...card,
    desc: card.desc.replace(',', '\n'),
  };

  const error = singleParagraph(multiParagraphCard);
  t.is(error.text, errors.singleParagraph);
});

test('Link check rule: exact name match on dictionary [[Full Name]]', t => {
  const { linkCheck, errors } = new Rules({ dictionary: mockDictionary });
  const linkedName = '[[Richard McClintock]]';
  const notFoundName = 'Richard Lionheart';
  const wrongLinkedNameCard = {
    ...card,
    desc: card.desc.replace(linkedName, `[[${notFoundName}]]`),
  };

  const error = linkCheck(wrongLinkedNameCard);
  t.is(error.text, errors.linkCheck(notFoundName));
});

test('Link check rule: username match on dictionary [[nickname]]', t => {
  const { linkCheck } = new Rules({ dictionary: mockDictionary });
  const linkedName = '[[Richard McClintock]]';
  const username = 'rich';
  const correctLinkedUsernameCard = {
    ...card,
    desc: card.desc.replace(linkedName, `[[${username}]]`),
  };

  t.falsy(linkCheck(correctLinkedUsernameCard));
});

test('Link check rule: composite match on dictionary [[nickname|Full Name]]', t => {
  const { linkCheck, errors } = new Rules({ dictionary: mockDictionary });
  const linkedName = '[[Richard McClintock]]';
  const composite = 'rich|Richard McClintock';
  const notFoundComposite = 'rich|Richard Lionheart';

  t.plan(2);

  const correctLinkedCompositeCard = {
    ...card,
    desc: card.desc.replace(linkedName, `[[${composite}]]`),
  };

  t.falsy(linkCheck(correctLinkedCompositeCard));

  const wrongLinkedCompositeCard = {
    ...card,
    desc: card.desc.replace(linkedName, `[[${notFoundComposite}]]`),
  };

  const error = linkCheck(wrongLinkedCompositeCard);
  t.is(error.text, errors.linkCheck(notFoundComposite));
});

test('No mispelled names rule', t => {
  const mispelledName = 'Rickard McClinton';
  const correctName = 'Richard McClintock';
  const otherNames = ['Ricardo Maquinto', 'Richard Lionheart'];
  const dictionary = {
    fullnames: [correctName, ...otherNames],
  };
  const { nameCheck, errors } = new Rules({ dictionary });
  const mispelledCard = {
    ...card,
    desc: card.desc.replace(correctName, mispelledName),
  };

  const error =  nameCheck(mispelledCard);

  const message = `${mispelledName} - Perhaps you meant: ${correctName}`;
  t.is(error.text, errors.nameCheck(message));
});

test('Valid card should pass all rules', t => {
  const { list } = new Rules({ dictionary: mockDictionary });
  t.plan(list.length);

  list.forEach(rule => {
    const error = rule(card);

    t.falsy(error);
  });
});
