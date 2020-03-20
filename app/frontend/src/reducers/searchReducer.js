const INITIAL_STATE = {
  usersList: [],
  isLoading: false
};

function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SEARCH_USERS":
      return {
        ...state,
        usersList: action.usersList.items,
        isLoading: false
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
}

export default searchReducer;
