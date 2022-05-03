import { Feed } from "../../components/feed/feed";
import { Rightbar } from "../../components/rightbar/rightbar";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Theme } from "../../components/theme/theme";
import { Topbar } from "../../components/topbar/topbar";
import "./homePage.css";

export const HomePage = () => {
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
