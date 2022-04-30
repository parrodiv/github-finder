import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

// ********GET SEARCH USERS*********
//PS: è una funzione asyncrona pertanto restituisce una promise, per ritornare l'array di oggetti ci sarà bisogno di async/await nella funzione in cui viene importato nel component UserSearch (in handleSubmit)
export const searchUsers = async (text) => {
  //cancello setLoading perchè lo faccio col dispatch direttamente dal component UserSearch

  const response = await github.get(`/search/users?q=${text}`);
  return response.data.items;
};

// *************GET USER AND REPOS***********
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`), //user
    github.get(`/users/${login}/repos?${params} //repos`),
  ]);

  // console.log(user, repos)
  //{data:{..}, status:200, ecc.}, {data:{..}, status:200, ecc.}

  return {
    //con axios il dato che riceviamo è contenuto nel object data
    user: user.data,
    repos: repos.data,
  };
};
