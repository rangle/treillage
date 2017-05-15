// import R from 'ramda';
import leven from 'leven';
import namesDictionary from 'dictionary/names.json';

export const PASS = 'Checks passed.';

const defaultDictionary = {
  fullnames: namesDictionary.fullnames,
  nicknames: namesDictionary.nicknames,
};

export default function Rules({ maxSize = 100, dictionary = defaultDictionary }) {
  this.maxSize = maxSize;
  this.dictionary = dictionary;

  this.errors = {
    noEmptyBody: 'This card\'s description is empty.',
    maxLength: `This card is over ${this.maxSize} characters long, please shorten.`,
    singleParagraph: `This card has multiple paragraphs.`,
    linkCheck: (name) => `'${name}' not found in name dictionary. Possible broken link. \n`,
    nameCheck: ({ nameSuggestions, linkSuggestions }) => {
      let message = '';

      if (nameSuggestions) message += `Possible mispellings. \n${nameSuggestions}`;
      if (linkSuggestions) message += linkSuggestions;
      return message;
    },
  };

  this.noEmptyBody = (card) => card.desc.length === 0 && {
    rule: 'noEmptyBody',
    text: this.errors.noEmptyBody,
  };

  this.maxLength = (card) => {
    const size = (card.name + ' ' + card.desc).split(' ').length;

    return size > this.maxSize && {
      rule: 'maxLength',
      text: this.errors.maxLength,
    };
  };

  this.singleParagraph = (card) => {
    const spacesOnTitle = card.name.match(/\n/);
    const spacesOnBody = card.desc.match(/\n/);

    return (spacesOnTitle || spacesOnBody) && {
      rule: 'singleParagraph',
      text: this.errors.singleParagraph,
    };
  };

  this.linkCheck = (card) => {
    const { fullnames, nicknames } = this.dictionary;
    let message = '';

    const findLinkedName = (linkedName) => {
      const parts = linkedName.split('|');
      const visibleName = parts[0];
      const fullName = parts[1];

      return fullnames[fullnames.indexOf(visibleName)]
        || nicknames[visibleName] && fullnames[fullnames.indexOf(fullName)]
        || !fullName && nicknames[visibleName]
        || fullName && fullnames[fullnames.indexOf(fullName)];
    };

    const linkedNames = card.desc.match(new RegExp(/\[\[.+?(?=(\]\]))/g)) || [];

    const notFoundNames = linkedNames
      .map(name => name.replace('[[', ''))
      .filter(name => !findLinkedName(name));

    notFoundNames.forEach(name => message += this.errors.linkCheck(name));

    return notFoundNames.length && {
      rule: 'linkCheck',
      text: message,
    };
  };

  this.nameCheck = (card) => {
    const { fullnames } = this.dictionary;
    const range = 0.35; // How far the name has to be to suggest a correction

    if (card.desc.length > 0) {
      const possibleNames = card.desc.match(new RegExp(/([A-Z]\w+(?:\s+(?:van|von|de|da|Da|Van))?\s+[A-Z]\w+(?:-\w+)?)(?!.*?(\]\]))/g)) || [];

      const suggestLink = (suggestions) => {
        return suggestions.reduce((suggestion, { name, nameLink }) => {
          return `${suggestion && suggestion + '\n'}${name} - You may want to add a wiki link: ${nameLink}`;
        }, '');
      };

      const linkSuggestions = suggestLink(
        possibleNames
          .map(name => {
            return fullnames.indexOf(name) !== -1 && {
              name,
              nameLink: `[[${name}]]`,
            };
          })
          .filter(notFoundNames => notFoundNames)
        );

      const suggestName = (suggestions) => {
        return suggestions.reduce((suggestion, { name, closeTo }) => {
          return `${suggestion && suggestion + '\n'}${name} - Perhaps you meant: ${closeTo.join(', ')}`;
        }, '');
      };

      const nameSuggestions = suggestName(
        possibleNames
          .filter(possibleName => fullnames.indexOf(possibleName) === -1)
          .map(possibleName => {
            const levenTreshold = Math.round(possibleName.length * range);

            return {
              name: possibleName,
              closeTo: fullnames.filter(name => leven(possibleName, name) < levenTreshold),
            };
          })
          .filter(possibleMatch => possibleMatch.closeTo && possibleMatch.closeTo.length > 0)
      );

      return (nameSuggestions || linkSuggestions) && {
        rule: 'nameCheck',
        text: this.errors.nameCheck({ nameSuggestions, linkSuggestions }),
        options: ['ignorable'],
      };
    }
  };

  this.list = [
    this.noEmptyBody,
    this.maxLength,
    this.singleParagraph,
    this.linkCheck,
    this.nameCheck,
  ];
}
