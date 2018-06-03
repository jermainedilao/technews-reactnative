import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import { setStatusBarStyle } from "./styles";
import AppWithNavigationState from "./navigators/AppNavigator";
import store from "./store";

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