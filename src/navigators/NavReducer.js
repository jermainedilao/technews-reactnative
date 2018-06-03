import { ToastAndroid } from "react-native";
import { AppNavigator } from "./AppNavigator";
import { NavigationActions } from "react-navigation";

const initialAction = { type: NavigationActions.Init };
const initialState = AppNavigator.router.getStateForAction(initialAction);

export default (state = initialState, action) => {
  console.log(state);
  let newState = AppNavigator.router.getStateForAction(action, state);
  console.log(newState);
  
  return newState;
}