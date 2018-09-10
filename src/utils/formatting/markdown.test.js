import test from 'ava';
import { getWikiLink, formatSectionHeader } from './markdown';

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

test('getWikiLink: wiki link making with a normal name', t => {
  const linkBaseUrl = 'https://github.com/rangle/hub/wiki/';
  t.deepEqual(`[Bob Vance](${linkBaseUrl}Bob-Vance)`, getWikiLink('Bob Vance'));
});

test('getWikiLink: wiki link making with name + nickname', t => {
  const linkBaseUrl = 'https://github.com/rangle/hub/wiki/';
  t.deepEqual(`[Bobby](${linkBaseUrl}Bob-Vance)`, getWikiLink('Bobby | Bob Vance'));
});

test('getWikiLink: formation with ampersand', t => {
  const linkBaseUrl = 'https://github.com/rangle/hub/wiki/';
  t.deepEqual(`[Bobby Orr & Bob Vance](${linkBaseUrl}Bobby-Orr-&-Bob-Vance)`, getWikiLink('Bobby Orr & Bob Vance'));
});

