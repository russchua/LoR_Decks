const INITIAL_STATE = {
  currentRoute: "MainPage"
};

function routingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "NAVIGATE_TO":
      return {
        ...state,
        currentRoute: action.routeName
      };

    default:
      return state;
  }
}

export default routingReducer;
