import React from "react";
import NavReducer from "./navigators/reducers";
import { applyMiddleware, combineReducers, createStore } from "redux";
import dataReducer from "./data/reducers";
import ReduxThunk from "redux-thunk";
import { middleware } from "./utils/redux";


const reducers = combineReducers({
  nav: NavReducer,
  data: dataReducer,
});

export default createStore(reducers, {}, applyMiddleware(ReduxThunk, middleware));