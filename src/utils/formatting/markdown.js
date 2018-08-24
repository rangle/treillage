export const getWikiLink = (code) => {
  const linkBaseUrl = 'https://github.com/rangle/hub/wiki/';
  const names = code.split('&');
  return names.map(name => {
    const parts = name.split('|');
    const visibleText = parts[0];
    const link = (parts[1] || parts[0]).trim().replace(/\s/g, '-');
    return `[${visibleText}](${linkBaseUrl}${link})`;
  });
};

export const replaceWikiLinks = (body) => body.replace(
  /\[\[(.*?)\]\]/g,
  (_, match) => getWikiLink(match)
);

const formatByline = byline => byline
  .split(' and ')
  .map((person) => '[[' + person.trim() + ']]')
  .join(' and ');

export const formatSectionHeader = (item) => `

# ${ item.title }

_Section edited by ${item.byline && formatByline(item.byline)}._

`;

const addImageUrl = (item) => item.image ? `

![Item cover image](${item.image})

` : '';

export const formatItem = (item) => `${addImageUrl(item)}

__${item.title}__ ${(item.body || '').replace(/\n/g, ' ')}

`;

export const enforceBlockquote = (markdown) =>
  markdown.replace(/[^(\n)>]>/g, '\n>');

export const enforceHorizontalRule = (markdown) =>
  markdown.replace(/[^(\n)(\*\*\*|\-\-\-|___)](\*\*\*|---|___)/g, '\n ___');
