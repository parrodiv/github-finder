import {useEffect, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'
import {useParams} from 'react-router-dom'

function User() {
  const {user, getUser} = useContext(GithubContext)

  const params = useParams()

  useEffect( () => {
    getUser(params.login)
    // <Link to={`/user/${login}`} in UserItem.jsx
    // quindi va ad aggiornare il parametro :login in App.js con il nome utente
    //cosi avviando questa funzione col parametro si ottiene l'oggetto user da GithubContext che setta il nuovo state
  }, [])

  return (
    <div>
      {user.login}
    </div>
  )
}

export default User
