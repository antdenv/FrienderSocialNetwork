import "./sidebar.css";
import {Home, Chat, Palette, People} from "@material-ui/icons";
import "./sidebar.css";
import {NavLink} from 'react-router-dom';
import { useContext} from "react";
import {AuthContext} from '../../context/authContext';

export const Sidebar = () => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="left">
            <NavLink to={`/profile/${user.login}`} className="profile">
                <div className="profile-picture">
                    <img src={user.profilePicture || PF + 'person/empty.png'} alt="avatar"/>
                </div>
                <div className="handle">
                    <h4>{user.username}</h4>
                    <p className="text-muted">
                        @{user.login}
                    </p>
                </div>
            </NavLink>
            <div className="sidebar">
                <NavLink to="/" className="menu-item active">
                    <span><Home className="icon"/></span><h3>Новости</h3>
                </NavLink>
                <NavLink to="/messages" className="menu-item">
                    <span><Chat className="icon"/></span><h3>Сообщения</h3>
                </NavLink>
                <NavLink to="/theme" className="menu-item" id="theme">
                    <span><Palette className="icon"/></span><h3>Тема</h3>
                </NavLink>
            </div>
            <button htmlFor="create-post" className="btn btn-primary">Выйти</button>
        </div>
    );
}