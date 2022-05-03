import { Feed } from "../../components/feed/feed";
import { Rightbar } from "../../components/rightbar/rightbar";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Theme } from "../../components/theme/theme";
import { Topbar } from "../../components/topbar/topbar";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import "./homePage.css";

export const HomePage = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            <Topbar/>
            <div className="main">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
            <Theme/>
        </div>
    );
}