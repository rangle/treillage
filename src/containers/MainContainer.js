import { connect } from 'react-redux';

import MainPage from 'components/MainPage';

function mapStateToProps(state) {
  return {
    content: state.trello.get('content').toJS(),
    error: state.trello.get('error').toJS(),
    renderMarkdown: state.trello.get('renderMarkdown'),
    loading: state.trello.get('loading'),
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
