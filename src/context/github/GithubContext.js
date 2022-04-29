import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search users
  const searchUsers = async (text) => {
    //set loading to true
    setLoading();

    const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();
    console.log(items);
    //destructuring, siccome la risposta sarà un oggetto con tanti parametri, a noi serve solo il parametro "items" che contiene un ARRAY di oggetti che contiene login, id, avatar_url ecc

    //dispatch cambia lo state come prima facevano setUsers e setLoading
    //risetta loading to false
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // Get single user
  const getUser = async (login) => {
    //set loading to true
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location('/notfound');
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  // Get user repos
  const getUserRepos = async (login) => {
    //set loading to true
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();
    console.log(data);
    //destructuring, siccome la risposta sarà un oggetto con tanti parametri, a noi serve solo il parametro "items" che contiene un ARRAY di oggetti che contiene login, id,avatar_url ecc

    //dispatch cambia lo state come prima facevano setUsers e setLoading
    //risetta loading to false
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };

  //Clear users
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  //loading to true
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,  //arr
        loading: state.loading,  //bool
        user: state.user,  //obj
        repos: state.repos, //arr
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
