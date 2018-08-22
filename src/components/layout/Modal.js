import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal as SemanticModal } from 'semantic-ui-react';

import { Button } from '../inputs/Button';

export class Modal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: props.isVisible,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.isVisible });
  }

  render() {
    const { type, children, style = {} } = this.props;

    const styles = {
      base: {
        top: '20%',
      },
      content: {
        padding: '2rem',
        backgroundColor: type === 'error' ? '#DB2828' : 'white',
        color: type === 'error' ? 'white' : 'black',
      },
      button: {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
      },
    };

    return (
      <SemanticModal
        open={this.state.visible}
        style={{ ...styles.base, style }}>
        <div style={styles.content}>
          { children }
          <Button inverted icon="window close" onClick={this.handleClose} style={styles.button}/>
        </div>
      </SemanticModal>
    );
  }

  handleClose() {
    this.setState({ visible: false });
  }
}
