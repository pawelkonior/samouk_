import {Outlet} from "react-router-dom";
import Cart from "../cart/Cart.jsx";

function Layout() {
    return (
        <div>
            <h1>Samouk</h1>
            <div><Cart /></div>
            <Outlet/>
        </div>
    );
}

export default Layout;