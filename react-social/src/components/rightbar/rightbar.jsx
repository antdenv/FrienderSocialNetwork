import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import { AuthContext } from "../../context/authContext";

export const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const {user: currentUser, dispatch, isEditProfile} = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  }, [currentUser.followings, user?.id]);

  useEffect(() => {
    if (user) {
      const getFriends = async () => {
        try {
          const friendsList = await axios.get('/user/friends/' + user.id);
          setFriends(friendsList.data);
        } catch(error) {
          console.log(error);
        }
      };

      const getFollowers = async () => {
        try {
          const followersList = await axios.get('/user/followers/' + user.id);
          setFollowers(followersList.data);
        } catch (error) {
          console.log(error);
        }
      }

      getFriends();
      getFollowers();
    }
  }, [user]);

  const relationshipStatus = (status) => {
    let result = '';
    switch (status) {
      case 1:
        result = 'В активном поиске';
        break;
      case 2:
        result = 'В отношениях';
        break;
      case 3:
        result = 'В браке';
        break;
      default:
        result = 'Не указано';
        break;
    };
    return result;
  };

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`/user/${user.id}/unfollow`, {userId: currentUser.id});
        dispatch({type: 'UNFOLLOW', payload: user.id});
      } else {
        await axios.put(`/user/${user.id}/follow`, {userId: currentUser.id});
        dispatch({type: 'FOLLOW', payload: user.id});
      }
    } catch (error) {
      console.log(error);
    }

    setFollowed(!followed);
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="birthdayText">
            <b>Настя Денисова</b> и еще <b>3 друга</b> отмечают день рождения сегодня.
          </span>
        </div>
        <ul className="rightbarFriendList">
            <h4 className="rightbarTitle">Друзья онлайн</h4>
          {/*Users.map((u) => (
            <Online key={u.id} user={u} />
          ))*/}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div className="profile-rightbar">
        {user && user.login === currentUser.login && 
          (<button 
            className="btn btn-primary edit-profile"
            onClick={() => dispatch({type: 'EDIT_PROFILE', payload: !isEditProfile})}
          >
              {isEditProfile ? 'Сохранить изменения' : 'Редактировать информацию'}
          </button>)
        }
        {user && user.login !== currentUser.login && (
          <div className="friend_buttons">
            <button 
              className="btn btn-primary" 
              onClick={followHandler}
            >
              {followed ? 'Отписаться' : 'Подписаться'}
            </button>
          </div>
        )}
        <h4 className="rightbarTitle">Информация</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Город:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Статус:</span>
            <span className="rightbarInfoValue">{relationshipStatus(user.relationship)}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Подписки</h4>
        <div className="rightbarFollowings">
          {
            friends.map(friend => {
              return (
                <NavLink to={`/profile/${friend.login}`} key={friend.id}>
                  <div className="rightbarFollowing">
                    <img
                      src={friend.profilePicture ? PF + friend.profilePicture : PF + 'person/empty.png'}
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                </NavLink>
              )
            })
          }
        </div>
        <h4 className="rightbarTitle">Подписчики</h4>
        <div className="rightbarFollowings">
          {
            followers.map(follower => {
              return (
                <NavLink to={`/profile/${follower.login}`} key={follower.id}>
                  <div className="rightbarFollowing">
                    <img
                      src={follower.profilePicture ? PF + follower.profilePicture : PF + 'person/empty.png'}
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{follower.username}</span>
                  </div>
                </NavLink>
              )
            })
          }
        </div>
      </div>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}