import {Link} from "react-router-dom";
import Cart from "../cart/Cart.jsx";
import {useContext} from "react";
import CartContext from "../../contexts/CartContext.jsx";

function Navbar() {
    const {cart} = useContext(CartContext);

    return (
        <div className="navbar">
            <Link to='/'><h1>Samouk</h1></Link>
            <nav>
                <Link to='/add-offer'>Dodaj ofertę</Link> |{' '}
                <Link to='/register'>Załóż konto</Link> |{' '}
                <Link to='/login'>Zaloguj się</Link>
            </nav>
            {!!cart.length && (<Cart/>)}
        </div>
    );
}

export default Navbar;