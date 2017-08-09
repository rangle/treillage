const getWikiLink = (code) => {
  const linkBaseUrl = 'https://github.com/rangle/hub/wiki/';
  const parts = code.split('|');
  const visibleText = parts[0];
  const link = (parts[1] || parts[0]).replace(/\s/g, '-');
  return `[${visibleText}](${linkBaseUrl}${link})`;
};

export const replaceWikiLinks = (body) => {
  return body.replace(
    /\[\[(.*?)\]\]/g,
    (_, match) => getWikiLink(match)
  );
};

const formatByline = byline => byline
  .split(' and ')
  .map((person) => '[[' + person.trim() + ']]')
  .join(' and ');

export const formatSectionHeader = (item) => `

# ${ item.title }

_Section edited by ${item.byline && formatByline(item.byline)}._

`;

const formatGhPageHeaderLink = (title) =>
  title.toLowerCase().replace(/[\[\]_+.,!@#$%^&*();\/|<>"']/g, '').replace(/(\t)|( )/g, '-');

export const formatHighlights = (item) => `
  # ${item.title}

  ${item.cardTitles.reduce((string, title) =>
    string.concat(`## - [${title}](#${formatGhPageHeaderLink(title)}) \n`), '')}
`;

const addImageUrl = (item) => item.image ? `

![Item cover image](${item.image})

` : '';

export const formatItem = (item) => `${addImageUrl(item)}

  ### ${item.title}
  ${(item.body || '').replace(/\n/g, ' ')}

`;
