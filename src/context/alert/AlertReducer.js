const alertReducer = (state, action) => {
  switch (action.type){
    case 'SET_ALERT':
      return action.payload //{msg, type} that will be a new state
    case 'REMOVE_ALERT':
      return null  //as well as the initial state
    default:
      return state
  }
}

export default alertReducer