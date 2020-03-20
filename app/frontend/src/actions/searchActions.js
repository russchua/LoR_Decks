export const searchUsers = data => ({
  type: "SEARCH_USERS",
  usersList: data
});

export const setLoading = () => ({
  type: "SET_LOADING"
});
