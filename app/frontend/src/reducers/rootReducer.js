import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import routingReducer from "./routingReducer";

const reducers = combineReducers({
  search: searchReducer,
  route: routingReducer,
});

export default reducers;
