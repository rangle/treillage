import test from 'ava';
import { formatSectionHeader, replaceWikiLinks } from './markdown';

test('header is correct format with &', t => {
  const item1 = {
    title: 'Rangle New HQ Grand Opening',
    byline: 'Bob Vance & Jim Beesly',
  };
  t.deepEqual(`

# Rangle New HQ Grand Opening

_Section edited by [[Bob Vance]] and [[Jim Beesly]]._

`, formatSectionHeader(item1));
});

test('header is correct format with and', t => {
  const item1 = {
    title: 'Rangle New HQ Grand Opening',
    byline: 'Bob Vance and Jim Beesly',
  };
  t.deepEqual(`

# Rangle New HQ Grand Opening

_Section edited by [[Bob Vance]] and [[Jim Beesly]]._

`, formatSectionHeader(item1));
});

test('\'and\' in the name', t => {
  const item1 = {
    title: 'Rangle New HQ Grand Opening',
    byline: 'Bob Vandy and Jim Beesly',
  };
  t.deepEqual(`

# Rangle New HQ Grand Opening

_Section edited by [[Bob Vandy]] and [[Jim Beesly]]._

`, formatSectionHeader(item1));
});

test('one person', t => {
  const item1 = {
    title: 'Rangle New HQ Grand Opening',
    byline: 'Bob Vance',
  };
  t.deepEqual(`

# Rangle New HQ Grand Opening

_Section edited by [[Bob Vance]]._

`, formatSectionHeader(item1));
});

test('replaceWikiLinks: replacing a name', t => {
  const markdownString = '[[ Rango Io ]]';
  t.deepEqual('[Rango Io](https://github.com/rangle/hub/wiki/Rango-Io)', replaceWikiLinks(markdownString));
});

test('replaceWikiLinks: replace name with additional text', t => {
  const markdownString = 'Hey, [[ Rango Io ]] is an amazing Developer';
  t.deepEqual('Hey, [Rango Io](https://github.com/rangle/hub/wiki/Rango-Io) is an amazing Developer', replaceWikiLinks(markdownString));
});

test('replaceWikiLinks: replace name without spacing', t => {
  const markdownString = '[[Rango Io]] is an amazing Developer';
  t.deepEqual('[Rango Io](https://github.com/rangle/hub/wiki/Rango-Io) is an amazing Developer', replaceWikiLinks(markdownString));
});

test('replaceWikiLinks: replace name with a nickname', t => {
  const markdownString = '[[ Ra | Rango Io]] is an amazing Developer';
  t.deepEqual('[Ra](https://github.com/rangle/hub/wiki/Rango-Io) is an amazing Developer', replaceWikiLinks(markdownString));
});

test('replaceWikiLinks: single name no space', t => {
  const markdownString = '[[Ranny|Rango]] is an amazing Developer';
  t.deepEqual('[Ranny](https://github.com/rangle/hub/wiki/Rango) is an amazing Developer', replaceWikiLinks(markdownString));
});


