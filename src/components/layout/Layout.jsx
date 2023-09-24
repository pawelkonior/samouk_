import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.jsx";

import "../../App.css";

function Layout() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
}

export default Layout;
