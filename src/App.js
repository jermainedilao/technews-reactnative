import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";

import reducers from "./reducers";
import { setStatusBarStyle } from "./styles";
import { middleware } from "./utils/redux";
import AppWithNavigationState from "./navigators/AppNavigator";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, middleware));
setStatusBarStyle();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;