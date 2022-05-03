import "./topbar.css";
import {NavLink} from 'react-router-dom';
import {Search, Person, Chat, Notifications} from "@material-ui/icons";
import { useContext } from "react";
import {AuthContext} from '../../context/authContext';

export const Topbar = () => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <nav>
            <div className="container">
                <NavLink to='/'>
                    <h2 className="logo">Friender</h2>
                </NavLink>
                <div className="search-bar">
                    <Search className="search-icon"/>
                    <input type="text" placeholder="Поиск" className="search-input"/>
                </div>
                <div className="create">
                    <div className="buttons">
                        <NavLink to='/'>
                            <button className="btn btn-primary tp-btn" htmlFor="create-post">Главная</button>
                        </NavLink>
                    </div>
                    <div className="topbar-icons">
                        <div className="topbar-icon-item">
                            <Person/>
                            <span className="topbar-icon-badge">1</span>
                        </div>
                        <div className="topbar-icon-item">
                            <Chat/>
                            <span className="topbar-icon-badge">1</span>
                        </div>
                        <div className="topbar-icon-item">
                            <Notifications/>
                            <span className="topbar-icon-badge">1</span>
                        </div>
                    </div>
                    <NavLink to={`/profile/${user.login}`}>
                        <div className="profile-picture">
                            <img src={user.profilePicture || PF + 'person/empty.png'} alt="avatar"/>
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}