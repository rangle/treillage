import { connect } from 'react-redux';

import MainPage from '../components/MainPage';

function mapStateToProps(state) {
  return {
    content: state.trello.get('content').toJS(),
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
