import { Post } from "../post/post";
import { Share } from "../share/share";
import {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../context/authContext';
import axios from 'axios';
import "./feed.css";

export const Feed = ({login}) => {
    const [posts, setPosts] = useState([]);
    const {user, isUpdated} = useContext(AuthContext);

    useEffect(() => {
        console.log(isUpdated);
        const fetchPosts = async () => {
            const response = login
            ? await axios.get("/posts/profile/" + login) 
            : await axios.get("/posts/timeline/" + user.id);
            setPosts(response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        };
        fetchPosts();
    }, [login, user.id, user.login, isUpdated]);

    return (
        <div className="feed-wrapper">
            {login 
                ? login === user.login && <Share/>
                : <Share/>
            } 
            {posts.map((post) => {
                return <Post post={post} key={post.id}/>
            })}
        </div>
    );
}