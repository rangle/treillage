import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Menu } from 'semantic-ui-react';

import {
  setRenderAsAction,
  getAllCardsAction,
  getMySectionAction,
  getMyCardsAction,
} from '../redux/trello/actions';
import { Navigator } from '../components/navigator/Navigator';
import { Content } from '../components/layout/Content';

class App extends Component {
  constructor(props) {
    super(props);

    const activeTab = props.router.location.hash.replace('#', '') || 'me';
    this.state = {
      show: activeTab,
    };
    this.handleFetchCards(activeTab);
    this.handleFetchCards = this.handleFetchCards.bind(this);
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
              <Menu.Item
                name="my cards"
                active={this.state.show === 'me'}
                link
                href="#me"
                onClick={() => this.handleShowCards('me')}
              />
              <Menu.Item
                name="my section"
                active={this.state.show === 'section'}
                link
                href="#section"
                onClick={() => this.handleShowCards('section')}
              />
              <Menu.Item
                name="all cards"
                active={this.state.show === 'all'}
                link
                href="#all"
                onClick={() => this.handleShowCards('all')}
              />
              <Menu.Item
                name="publish"
                active={this.state.show === 'publish'}
                link
                href="#publish"
                onClick={() => this.handleShowCards('publish')}
              />
            </Menu>
          </div>
        </Navigator>
        <Content isVisible>
          { children }
        </Content>
      </div>
    );
  }

  handleFetchCards(filter) {
    const { handleGetAllCards, handleGetSectionCards, handleGetMyCards, handleRenderAs } = this.props;

    const actions = {
      'publish': handleGetAllCards,
      'all': handleGetAllCards,
      'section': handleGetSectionCards,
      'me': handleGetMyCards,
    };

    filter === 'publish' ? handleRenderAs('markdown') : handleRenderAs('preview');
    actions[filter]();
  }

  handleShowCards(filter) {
    this.setState({ show: filter });
    this.handleFetchCards(filter);
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
  };
}

const mapDispatchToProps = {
  handleRenderAs: setRenderAsAction,
  handleGetAllCards: getAllCardsAction,
  handleGetSectionCards: getMySectionAction,
  handleGetMyCards: getMyCardsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

App.propTypes = {
  children: PropTypes.node,
  handleRenderAs: PropTypes.func,
  handleGetAllCards: PropTypes.func,
  handleGetSectionCards: PropTypes.func,
  handleGetMyCards: PropTypes.func,
  router: PropTypes.shape({
    location: PropTypes.shape({
      hash: PropTypes.string,
    }),
  }),
};
