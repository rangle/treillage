import test from 'ava';
import rules, { noEmptyBody, maxLength, nameCheck } from './rules';

const emptyBodyCard = {
  id: '5901b96834bd455486a22657',
  desc: '',
  descData: {
    'emoji': {},
  },
};

const longCard = {
  id: '5901b96834bd455486a22657',
  desc: `Contrary to popular belief, Lorem Ipsum is not simply random text.
  It has roots in a piece of classical Latin literature from 45 BC, making
  it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
  College in Virginia, looked up one of the more obscure Latin words, consectetur,
  from a Lorem Ipsum passage, and going through the cites of the word in classical
  literature, discovered the undoubtable source. Lorem Ipsum comes from sections
  1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil)
  by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
   very popular during the Renaissance. The first line of Lorem Ipsum,
  "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  descData: {
    'emoji': {},
  },
};

const mispelledCard = {
  id: '5901b96834bd455486a22657',
  desc: `[[Mickel Besco]] has decided to pursue opportunities outside of Rangle.
    Throughout his time here Miguel worked on many projects, Podium,
    Shape Security and Veracode to name just a few, and contributed to Rangle in other ways,
    like the blog. It was a pleasure to see Miguel grow as a professional,
    and become proficient in both AngularJS, Angular and React.`,
  descData: {
    'emoji': {},
  },
};

const validCard = {
  id: '5901b96834bd455486a22657',
  desc: `[[Miguel Vesco]] has decided to pursue opportunities outside of Rangle.
    Throughout his time here Miguel worked on many projects, Podium,
    Shape Security and Veracode to name just a few, and contributed to Rangle in other ways,
    like the blog. It was a pleasure to see Miguel grow as a professional,
    and become proficient in both AngularJS, Angular and React.`,
  descData: {
    'emoji': {},
  },
};

test('No empty body rule', t => {
  const error = noEmptyBody(emptyBodyCard);

  t.truthy(error);
});

test('No long card rule',  t => {
  const error = maxLength(longCard);

  t.truthy(error);
});

test('No mispelled names rule', t => {
  const error =  nameCheck(mispelledCard);

  t.truthy(error);
});

test('Valid card should pass all rules', t => {
  t.plan(rules.length);

  rules.forEach(rule => {
    const error = rule(validCard);

    t.falsy(error);
  });
});
