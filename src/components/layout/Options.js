import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Button, ButtonGroup, ButtonOr } from '../inputs/Button';

export const Options = ({ handleClipboard, handleRenderAsMarkdown, handleRenderAsHTML, renderAs }) => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={8} textAlign={'left'}>
        <ButtonGroup>
          <Button
            primary={renderAs === 'markdown'}
            onClick={handleRenderAsMarkdown}
          >
              Display as Markdown
          </Button>
          <ButtonOr />
          <Button
            primary={renderAs === 'html'}
            onClick={handleRenderAsHTML}
          >
              Display as HTML
          </Button>
        </ButtonGroup>
      </Grid.Column>
      <Grid.Column width={8} textAlign={'right'}>
        <Button
          positive
          onClick={() => handleClipboard(document.getElementById('content').innerText)}
        >
          Copy to Clipboard
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

Options.propTypes = {
  handleClipboard: PropTypes.func,
  handleRenderAsMarkdown: PropTypes.func,
  handleRenderAsHTML: PropTypes.func,
  renderAs: PropTypes.oneOf(['text', 'markdown', 'html']),
};
