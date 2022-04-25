import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UserItem({ user: { login, avatar_url } }) {
  //destructuring object
  return (
    <div className="card shadow-xl card-compact bg-base-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full w-14 h14">
              <img src={avatar_url} alt="Profile" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{login}</h2>
          <Link
            to={`/users/${login}`}
            className="text-base-content text-opacity-40"
          >
            Visite Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
