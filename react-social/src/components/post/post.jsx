import { useState, useEffect, useContext } from "react";
import "./post.css";
import { Cancel, ThumbUpAlt, ThumbDownAlt } from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";
import {AuthContext} from '../../context/authContext';

export const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user: currentUser, dispatch, isUpdated} = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser.id));
  }, [currentUser.id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post.id}/like`, {userId: currentUser.id});
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/user/?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  const deletePostHandler = async () => {
    try {
      await axios.delete(`/posts/${post.id}`, { data: { userId: currentUser.id } });
      dispatch({type: 'FEED_UPDATED', payload: !isUpdated});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="feeds">
      <div className="feed">
        <div className="head">
          <div className="user">
            <NavLink to={`profile/${user.login}`}>
              <div className="profile-picture">
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/empty.png"
                  }
                  alt="avatar"
                />
              </div>
            </NavLink>
            <div className="info">
              <h3>{user.username}</h3>
              <small>{moment(post.createdAt).locale("ru").fromNow()}</small>
            </div>
          </div>
          <span className="edit">
            {currentUser.id === post.userId && <Cancel onClick={deletePostHandler} style={{cursor: "pointer", opacity: "0.7"}}/>}
          </span>
        </div>
        <div className="caption">
          <p>{post?.desc}</p>
        </div>
        <div className="photo">
          <img src={PF + post.image} alt="post" />
        </div>
        <div className="interaction-buttons">
          <span>
            {isLiked 
            ? (<ThumbDownAlt onClick={likeHandler} style={{cursor: "pointer", fill: "hsl(0, 95%, 65%)",}}/>) 
            : (<ThumbUpAlt onClick={likeHandler} style={{cursor: "pointer", fill: "var(--color-primary)",}}/>)
            }
          </span>
          <div className="liked-by">
            <p>
              <b>{like}</b> нравится это
            </p>
          </div>
        </div>
        <div className="comments text-muted">Комментарии ({post.comment})</div>
      </div>
    </div>
  );
};
