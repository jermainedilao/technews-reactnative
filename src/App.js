import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import { Routes } from "./routes"
import { setStatusBarStyle } from "./styles";

class App extends Component {
  componentWillMount() {
    this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    setStatusBarStyle();
  }
  
  render() {
    return (
      <Provider store={this.store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;