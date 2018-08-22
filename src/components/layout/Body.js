import React from 'react';
import PropTypes from 'prop-types';

import { updateCard } from '../../services/api';
import { formatItem } from '../../utils/formatting/markdown';

import { Renderer } from './Renderer';
import { Messages } from './Messages';
import { Button } from '../inputs/Button';

export const Body = ({ item, renderAs }) => {
  const styles = {
    section: {
      'backgroundColor': item.messages.length === 0 ? 'white' : 'pink',
      'border': '1px solid gray',
      'padding': '1em',
      'marginBottom': '16px',
    },
    message: {
      fontSize: '12px',
      fontStyle: 'italic',
    },
    pass: {
      color: 'green',
    },
    error: {
      color: 'red',
    },
  };

  const handleIgnore = (message) => {
    item.messages.splice(item.messages.indexOf(message));
  };

  return (
    <div style={styles.section}>
      <Renderer
        renderAs={renderAs}
        markdown={formatItem(item)}
      />
      {renderAs === 'text' &&
         <div>
           <Messages list={item.messages} handleIgnore={handleIgnore} />
           {item.messages.length === 0 &&
             <Button positive onClick={ () => updateCard(item.id) }>{'Approve'}</Button>
           }
         </div>
      }
    </div>
  );
};

Body.propTypes = {
  item: PropTypes.object,
  renderAs: PropTypes.oneOf(['text', 'markdown', 'html']),
};
