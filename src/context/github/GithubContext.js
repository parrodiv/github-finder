import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search users
  const searchUsers = async (text) => {
    //set loading to true
    setLoading()

    const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const {items} = await response.json();
    console.log(items);
    //facciamo destructuring, siccome la risposta sarà un oggetto con tanti parametri, a noi serve solo il parametro "items" che contiene login, id,avatar_url ecc

    //dispatch cambia lo state come prima facevano setUsers e setLoading
    //risetta loading to false
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  };

  //Clear users
  const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

  //loading to true
  const setLoading = () => dispatch({type: 'SET_LOADING'})


  return (
    <GithubContext.Provider 
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext