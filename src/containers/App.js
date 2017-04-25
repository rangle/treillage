import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Menu } from 'semantic-ui-react';

import { fetchAllCards, fetchMySection, fetchMyCards } from '../redux/trello/actions';
import Navigator from '../components/navigator/Navigator';
import Content from '../components/ui/Content';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    handleAllCards: PropTypes.func,
    handleSectionCards: PropTypes.func,
    handleMyCards: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      show: 'all',
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
              <Menu.Item name="all cards" active={this.state.show === 'all'} onClick={() => this.handleShowCards('all')} />
              <Menu.Item name="my section" active={this.state.show === 'section'} onClick={() => this.handleShowCards('section')} />
              <Menu.Item name="my cards" active={this.state.show === 'me'} onClick={() => this.handleShowCards('me')} />
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
<<<<<<< HEAD
    const { handleAllCards, handleSectionCards, handleMyCards } = this.props;

    const actions = {
      'all': handleAllCards,
      'section': handleSectionCards,
=======
    const { handleAllCards, handleMyCards } = this.props;

    const actions = {
      'all': handleAllCards,
>>>>>>> cf164bad06ee754d07295636dbb432c925474dd8
      'me': handleMyCards,
    };

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
  handleAllCards: fetchAllCards,
<<<<<<< HEAD
  handleSectionCards: fetchMySection,
=======
>>>>>>> cf164bad06ee754d07295636dbb432c925474dd8
  handleMyCards: fetchMyCards,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
