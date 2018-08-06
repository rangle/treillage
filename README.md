# Treillage

> A weekly newsletter aggregator.

## Getting Started: Writer's Guide

### Auto wiki links

To get automatic links to the [Rangle weekly](https://github.com/rangle/hub/wiki/), enclose a name with double square brackets:
- `[[ Actual Name ]]`
- `[[ Nickname | Actual Name ]]`
- `[[ Name One & Name Two & Thirdy | Name Three]]`


## Getting Started: Developer Guide

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
