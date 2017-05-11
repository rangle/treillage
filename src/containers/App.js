import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Menu } from 'semantic-ui-react';

import { setMarkdownRender, fetchAllCards, fetchMySection, fetchMyCards } from 'redux/trello/actions';
import Navigator from 'components/navigator/Navigator';
import Content from 'components/layout/Content';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    handleMarkdownRender: PropTypes.func,
    handleAllCards: PropTypes.func,
    handleSectionCards: PropTypes.func,
    handleMyCards: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      show: 'me',
    };
    this.handleShowCards = this.handleShowCards.bind(this);
  }

  render() {
    const { children } = this.props;

    const styles = {
      banner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: '20px 0 0 20px',
        width: '100%',
      },
      header: {
        color: '#fff',
      },
    };

    return (
      <div>
        <Navigator>
          <div style={styles.banner}>
            <Header as="h2" style={styles.header}>Rangle Weekly Preview</Header>
            <Menu inverted pointing secondary>
              <Menu.Item name="my cards" active={this.state.show === 'me'} onClick={() => this.handleShowCards('me')} />
              <Menu.Item name="my section" active={this.state.show === 'section'} onClick={() => this.handleShowCards('section')} />
              <Menu.Item name="all cards" active={this.state.show === 'all'} onClick={() => this.handleShowCards('all')} />
              <Menu.Item name="publish" active={this.state.show === 'publish'} onClick={() => this.handleShowCards('publish')} />
            </Menu>
          </div>
        </Navigator>
        <Content isVisible>
          { children }
        </Content>
      </div>
    );
  }

  handleShowCards(filter) {
    const { handleMarkdownRender, handleAllCards, handleSectionCards, handleMyCards } = this.props;

    const actions = {
      'publish': handleAllCards,
      'all': handleAllCards,
      'section': handleSectionCards,
      'me': handleMyCards,
    };

    filter === 'publish' ? handleMarkdownRender(false) : handleMarkdownRender(true);
    this.setState({ show: filter });
    actions[filter]();
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
  };
}

const mapDispatchToProps = {
  handleMarkdownRender: setMarkdownRender,
  handleAllCards: fetchAllCards,
  handleSectionCards: fetchMySection,
  handleMyCards: fetchMyCards,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
