const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


// GET SEARCH USERS
//PS: è una funzione asyncrona pertanto restituisce una promise, per ritornare l'array di oggetti ci sarà bisogno di async/await nella funzione in cui viene importato nel component UserSearch (in handleSubmit) 
  export const searchUsers = async (text) => {
    //cancello setLoading perchè lo faccio col dispatch direttamente dal component UserSearch

    const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();
    //destructuring, siccome la risposta sarà un oggetto con tanti parametri, a noi serve solo il parametro "items" che contiene un ARRAY di oggetti che contiene login, id, avatar_url ecc

    //cancello dispatch perchè lo faccio direttamente dal component UserSearch
    return items
  };