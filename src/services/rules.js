// import R from 'ramda';
import leven from 'leven';
import defaultNames from '../dictionary/names.json';

export const PASS = 'Checks passed.';

export default function Rules({ maxWordCount = 150, names = defaultNames.list }) {
  this.maxWordCount = maxWordCount;
  this.maxImageSize = {
    height: 600,
    width: 800,
  };
  this.names = names;

  this.errors = {
    noEmptyBody: 'This card\'s description is empty.',
    maxLength: (length) => `This card has ${length} words.
    The recommended count is ${this.maxWordCount}.`,
    singleParagraph: 'This card has multiple paragraphs.',
    nameCheck: (message) => `Possible mispellings: ${message}`,
    maxResolution: (size) => `Image size of ${size.height}px height and ${size.width}px width.
    The maximum recommended is ${this.maxImageSize.width}px width, and/or ${this.maxImageSize.height}px height.`,
  };

  this.noEmptyBody = (card) => card.desc.length === 0 && {
    rule: 'noEmptyBody',
    text: this.errors.noEmptyBody,
  };

  this.maxLength = (card) => {
    const text = (card.name + ' ' + card.desc).split(' ');

    return text.length > this.maxWordCount && {
      rule: 'maxLength',
      text: this.errors.maxLength(text.length),
      options: ['ignorable'],
    };
  };

  this.singleParagraph = (card) => {
    const spacesOnTitle = card.name.match(/\n\n./);
    const spacesOnBody = card.desc.match(/\n\n./);

    return (spacesOnTitle || spacesOnBody) && {
      rule: 'singleParagraph',
      text: this.errors.singleParagraph,
    };
  };

  this.nameCheck = (card) => {
    const range = 0.35; // How far the name has to be to suggest a correction

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
            return `${suggestion}\n  ${name} - Perhaps you meant: ${closeTo.join(', ')}`;
          }, '');
        };

        const message = suggest(
          possibleNames
            .filter(possibleName => this.names.indexOf(possibleName) === -1)
            .map(possibleName => {
              const levenTreshold = Math.round(possibleName.length * range);

              return {
                name: possibleName,
                closeTo: this.names.filter(name => leven(possibleName, name) < levenTreshold),
              };
            })
            .filter(possibleMatch => possibleMatch.closeTo && possibleMatch.closeTo.length > 0)
        );

        return message && {
          rule: 'nameCheck',
          text: this.errors.nameCheck(message),
          options: ['ignorable'],
        };
      }
    }

    return false;
  };

  this.maxResolution = (card) => {
    if (!card.image) return false;

    const image = new window.Image();

    const getImageResolution = new Promise((resolve) => {
      image.onload = () => {
        const { height, width } = image;
        resolve({ height, width });
      };
    });

    image.src = card.image;

    return getImageResolution.then(({ height, width}) =>
      (
        height > this.maxImageSize.height ||
        width > this.maxImageSize.width
      ) && {
        rule: 'maxResolution',
        text: this.errors.maxResolution({ height, width }),
      });
  };

  return [
    this.noEmptyBody,
    this.maxLength,
    this.singleParagraph,
    this.nameCheck,
    this.maxResolution,
  ];
}
