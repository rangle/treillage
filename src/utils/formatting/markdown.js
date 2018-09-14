const getWikiLink = (name) => {
  const linkBaseUrl = 'https://github.com/rangle/hub/wiki/';
  const parts = name.split('|').map(nameText => nameText.trim());
  const visibleText = parts[0];
  const link = (parts[1] || parts[0]).trim().replace(/\s/g, '-');
  return `[${visibleText}](${linkBaseUrl}${link})`;
};

export const replaceWikiLinks = (body) => body.replace(
  /\[\[(.*?)\]\]/g,
  (_, match) => getWikiLink(match)
);

const formatByline = byline => byline
  .split(/\sand\s|\s\&\s/)
  .map((person) => '[[' + person.trim() + ']]')
  .join(' and ');

export const formatSectionHeader = (item) => `

# ${ item.title }

_Section edited by ${item.byline && formatByline(item.byline)}._

`;


const addImageUrls = (item) => item.images ? item.images.map((image, i) => `![Item image${i}](${image})`).join('\n') : '';

export const formatItem = (item) => `${addImageUrls(item)}

__${item.title}__ ${(item.body || '')}

`;

// TODO: Used when single paragraph was enforced, as an exception to accept these.
//       Decide whether multiple or single paragraphs will be the norm.
export const enforceBlockquote = (markdown) =>
  markdown.replace(/[^(\n)>]>/g, '\n>');

export const enforceHorizontalRule = (markdown) =>
  markdown.replace(/[^(\n)(\*\*\*|\-\-\-|___)](\*\*\*|---|___)/g, '\n___');
