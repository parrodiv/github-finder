const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state, //initialState
        //aggiorno l'initialState
        users: action.payload,
        loading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }
    default: 
      return state
  }
}

export default githubReducer