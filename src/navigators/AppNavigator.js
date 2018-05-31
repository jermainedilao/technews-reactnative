import React, { Component } from "react";
import { BackHandler, DeviceEventEmitter } from "react-native";
import { createStackNavigator, NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import { createReduxBoundAddListener, initializeListeners } from "react-navigation-redux-helpers";
import { connect } from "react-redux";

import BookmarkList from "../components/articles/BookmarkList";
import ArticleList from "../components/articles/ArticleList";
import { ROUTE_ARTICLE_LIST, ROUTE_BOOKMARK_LIST } from "./routes";
import { HEADER_BACKGROUND_COLOR, HEADER_BUTTON_ICON_COLOR } from "../styles";

export const AppNavigator = createStackNavigator({
  [ROUTE_ARTICLE_LIST]: ArticleList,
  [ROUTE_BOOKMARK_LIST]: BookmarkList
}, {
  initialRouteName: ROUTE_ARTICLE_LIST,
  navigationOptions: {
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_BUTTON_ICON_COLOR
  }
});

class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);
    this.backPressSubscriptions = new Set();
  }
  
  componentDidMount() {
    initializeListeners("root", this.props.nav);
    
    // https://github.com/facebook/react-native/issues/3223#issuecomment-355064410
    DeviceEventEmitter.removeAllListeners("hardwareBackPress");
    DeviceEventEmitter.addListener("hardwareBackPress", () => {
      let invokeDefault = true;
      const subscriptions = [];
      
      this.backPressSubscriptions.forEach(sub => subscriptions.push(sub));
      
      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          invokeDefault = false;
          break;
        }
      }
      
      if (invokeDefault) {
        BackHandler.exitApp();
      }
    });
  
    this.backPressSubscriptions.add(this.onBackPress);
  }
  
  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners("hardwareBackPress");
    this.backPressSubscriptions.clear();
  }
  
  onBackPress = () => {
    console.log("hardwareBackPress");
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    
    dispatch(NavigationActions.back());
    return true;
  };
  
  render() {
    const { dispatch, nav } = this.props;
    const navigation = {
      dispatch,
      state: nav,
      addListener: createReduxBoundAddListener("root")
    };
    return <AppNavigator navigation={navigation} />
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);