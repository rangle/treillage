import { connect } from 'react-redux';

import { fetchMyCards, fetchMySection, fetchAllCards } from '../redux/trello/actions';
import MainPage from '../components/MainPage';

function mapStateToProps(state) {
  return {
    content: state.trello.get('content').toJS(),
  };
}

const mapDispatchToProps = {
  fetchMyCards,
  fetchMySection,
  fetchAllCards,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
