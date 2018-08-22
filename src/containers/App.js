import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Menu } from 'semantic-ui-react';
import R from 'ramda';

import {
  setRenderAsAction,
  getAllCardsAction,
  getMySectionAction,
  getMyCardsAction,
} from '../redux/trello/actions';
import { Navigator } from '../components/navigator/Navigator';
import { Content } from '../components/layout/Content';

const tabs = ['me', 'section', 'all', 'publish'];
const tabLabelMap = {
  'me': 'my cards',
  'section': 'my section',
  'all': 'all cards',
  'publish': 'publish',
};

class App extends Component {
  constructor(props) {
    super(props);

    const hashLink = props.router.location.hash.replace('#', '');
    const activeTab = R.contains(hashLink, tabs) ? hashLink : 'me';
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
              {tabs.map(tab => (
                <Menu.Item
                  key={tab}
                  name={tabLabelMap[tab]}
                  active={this.state.show === tab}
                  link
                  href={`#${tab}`}
                  onClick={() => this.handleShowCards(tab)}
                />
              ))}
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

    filter === 'publish' ? handleRenderAs('markdown') : handleRenderAs('text');
    console.log(filter);
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
