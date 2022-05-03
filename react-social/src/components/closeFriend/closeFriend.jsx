import {NavLink} from 'react-router-dom';

export const CloseFriend = ({friend}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <NavLink to={`/profile/${friend.login}`} className="profile friend">
      <div className="profile-picture">
        <img src={friend.profilePicture ? PF + friend.profilePicture : PF + 'person/empty.png'} alt="avatar" />
      </div>
      <div className="handle">
        <h4>{friend.username}</h4>
      </div>
    </NavLink>
  );
};
