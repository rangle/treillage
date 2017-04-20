import { connect } from 'react-redux';

import { fetchAllCards, fetchMyCards } from '../redux/trello/actions';
import MainPage from '../components/MainPage';

function mapStateToProps(state) {
  return {
    content: state.trello.get('content').toJS(),
  };
}

const mapDispatchToProps = {
  fetchAllCards,
  fetchMyCards,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
