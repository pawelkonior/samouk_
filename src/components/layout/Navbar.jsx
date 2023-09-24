import {Link} from "react-router-dom";
import Cart from "../cart/Cart.jsx";
import {useContext} from "react";
import CartContext from "../../contexts/CartContext.jsx";

function Navbar() {
    const {cart} = useContext(CartContext);

    return (
        <div className="navbar">
            <h1>Samouk</h1>
            <Link to='/add-offer'>Dodaj ofertę</Link>
            {!!cart.length && (<Cart/>)}
        </div>
    );
}

export default Navbar;