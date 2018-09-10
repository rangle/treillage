# Treillage

> A weekly newsletter aggregator.

## How it works

[Trello's cards](https://trello.com/b/t7Uc1jyN/rangle-weekly) are expected to be written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
Treillage features _rules_:
- `noEmptyBody`: Warns about empty description cards.
- `maxLength`: Warns when cards exceed a defined word count _(currently 150)_.
- `singleParagraph`: Warns when cards have multiple paragraphs.
- `nameCheck`: Uses [Leven](https://github.com/sindresorhus/leven) to suggest possible typo fixes for names. [Needs updating](https://github.com/rangle/treillage/issues/26).
- `maxResolution`: Warns about large resolution images _(currently larger than 800px width or 600px height)_.

... And 3 display modes:
- `Preview`: The end user content, rendered by [Marked](https://github.com/markedjs/marked).
- `Markdown`: The Trello board aggregate output, plus some Treillage enhancements (e.g. Wiki Links).
- `HTML`: The HTML equivalent of the Markdown content, rendered by [Showdown](https://github.com/showdownjs/showdown).

## Getting Started: Writer's Guide

### Labels

- __APPROVED BY EDITOR__: Trello cards with this label will feature in Treillage.
- __HOLD__: Prevents a card from featuring in Treillage, even if it's `APPROVED BY EDITOR`.

### Auto wiki links

To get automatic links to the [Rangle Wiki](https://github.com/rangle/hub/wiki/), enclose a name with double square brackets:
- `[[ Actual Name ]]`
- `[[ Nickname | Actual Name ]]`


## Getting Started: Developer's Guide

See it live on http://rangle.github.io/treillage

### Libraries
- React/Redux
- [Immutable](https://facebook.github.io/immutable-js/docs/#/)
- [Ramda](https://ramdajs.com/docs/)
- [Semantic UI](https://react.semantic-ui.com/)
- [Ava](https://github.com/avajs/ava)

### Development
```bash
$ yarn start
```

Open `http://localhost:3000` in your browser.

### Tests

#### Single Run
```bash
$ yarn run test
```

#### Watch Files
```bash
$ yarn run test:watch
```

#### Coverage
```bash
$ yarn run test:coverage
```

### Production
```bash
$ yarn build
```

## License

Copyright (c) 2015 - 2018 rangle.io

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"
