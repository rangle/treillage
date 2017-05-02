// import R from 'ramda';
import leven from 'leven';
import names from '../dictionary/names.json';

const maxSize = 100;

const errors = {
  noEmptyBody: 'This card\'s description is empty.',
  maxLength: `This card is over ${maxSize} characters long, please shorten.`,
  nameCheck: `Possible mispellings.`,
};

const noEmptyBody = (card) => card.desc.length === 0 && { text: errors.noEmptyBody };

const maxLength = (card) => {
  const size = (card.name + ' ' + card.desc).split(' ').length;

  return size > maxSize && { text: errors.maxLength };
};

const nameCheck = (card) => {
  const levenTreshold = 5; // The treshold on how distant the word has to be to be suggested as a name

  if (card.desc.length > 0) {
    const possibleNames = card.desc.match(new RegExp(/([A-Z][\w]*(\s+(van|von|de|da|Van))?(\s+[A-Z][\w]*))/g));

    if (possibleNames) {
      // Comments as reference:

      // Ideally, processing Slack/Resource Guru happens at the start of the app.
      // The below people output has been cached as names.list

      // const filterByRg = p => names.rg.indexOf(p.realName) !== -1;
      // const filterByName = p => p.realName;
      // const filterByEmail = p => p.email && p.email.split('@')[1] === 'rangle.io';
      // const removeEmails =  p => ({ name: p.realName, username: p.name });
      // const removeUsernames = p => new RegExp(p.name.replace(' ', '|'), 'i').test(p.username) ? p.name : ([p.name, p.username]);
      //
      // const people = R.flatten(names.slack
      //   // .filter(filterByRg)
      //   .filter(filterByName)
      //   .filter(filterByEmail)
      //   .map(removeEmails)
      //   .map(removeUsernames)
      // );

      const suggest = (suggestions) => {
        return suggestions.reduce((suggestion, { name, closeTo }) => {
          return `${suggestion} \n ${name} - Perhaps you meant: ${closeTo.join(', ')}`;
        }, '');
      };

      const message = suggest(
        possibleNames
          .filter(possibleName => names.list.indexOf(possibleName) === -1)
          .map(possibleName => ({
            name: possibleName,
            closeTo: names.list.filter(name => leven(possibleName, name) < levenTreshold),
          }))
          .filter(possibleMatch => possibleMatch.closeTo.length > 0)
      );

      return message && { text: `${errors.nameCheck} \n ${message}`, options: ['ignorable'] };
    }
  }
};

export const PASS = 'Checks passed.';

export {
  noEmptyBody,
  maxLength,
  nameCheck,
};

export default [
  noEmptyBody,
  maxLength,
  nameCheck,
];
