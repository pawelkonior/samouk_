import {Link, Outlet} from "react-router-dom";
import Cart from "../cart/Cart.jsx";

function Layout() {
    return (
        <div>
            <h1>Samouk</h1>
            <Link to='/add-offer'>Dodaj ofertę</Link>
            <div><Cart /></div>
            <Outlet/>
        </div>
    );
}

export default Layout;