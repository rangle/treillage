import { connect } from 'react-redux';

import { setRenderAsAction } from '../redux/trello/actions';
import { MainPage } from '../components/MainPage';

function mapStateToProps(state) {
  return {
    content: state.trello.get('content').toJS(),
    error: state.trello.get('error'),
    renderAs: state.trello.get('renderAs'),
    isLoading: state.trello.get('isLoading'),
  };
}

const mapDispatchToProps = {
  handleRenderAs: setRenderAsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
