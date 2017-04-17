import React from 'react';
import { connect } from 'react-redux';
import Navigator from '../components/navigator/Navigator';
import NavigatorItem from '../components/navigator/NavigatorItem';
import Content from '../components/ui/Content';

function mapStateToProps(state) {
  return {
    router: state.router,
  };
}

function mapDispatchToProps() {
  return {};
}

const App = ({ children }) => {
  return (
    <div>
      <Navigator>
        <div className="flex flex-auto">
          <NavigatorItem className="p1">
            <span className="red bold">Rangle Weekly Preview</span>
          </NavigatorItem>
        </div>
      </Navigator>
      <Content isVisible>
        { children }
      </Content>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
