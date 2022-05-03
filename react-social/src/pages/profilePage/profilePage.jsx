import './profilePage.css';
import { Topbar } from '../../components/topbar/topbar';
import { Theme } from '../../components/theme/theme';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Rightbar } from '../../components/rightbar/rightbar';
import { Feed } from '../../components/feed/feed';
import { EditProfile } from '../../components/editProfile/editProfile';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from 'react-router';
import { AuthContext } from '../../context/authContext';

export const ProfilePage = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const login = useParams().login;
    const coverPicture = user.coverPicture ? PF + user.coverPicture : PF + 'person/noCover.webp';
    const avatarPicture = user.profilePicture ? PF + user.profilePicture : PF + 'person/empty.png';
    const {isEditProfile} = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
          const response = await axios.get(`/user/?login=${login}`);
          setUser(response.data);
        };
        fetchUser();
    }, [login]);

    return (
        <div>
            <Topbar/>
            <div className="profile-page">
                <Sidebar/>
                <div>
                    <div className="profile-right-top">
                        <div className="profile-cover">
                                <img 
                                    src={coverPicture} 
                                    alt="cover" 
                                    className='cover-img'
                                />
                                <img 
                                    src={avatarPicture} 
                                    alt="avatar" 
                                    className='avatar-img'
                                />
                        </div>
                        <div className="profile-info">
                            <h4 className='profile-info-name'>{user.username}</h4>
                            <span className='profile-info-desc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="profile-right-bottom">
                        {isEditProfile ? <EditProfile/> : <Feed login={login}/>}
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
            <Theme/>
        </div>
    );
}