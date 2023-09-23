import {useContext, useState} from "react";
import CartContext from "../../contexts/CartContext.jsx";

function Cart() {
    const {cart, setCart} = useContext(CartContext);
    const [isShow, setIsShow] = useState(false)
    const [hideTimeout, setHideTimeout] = useState(null);

    function getTotalPrice() {
        return cart.reduce((acc, ce) => acc + ce.price, 0);
    }

    function removeOffer(id) {
        return () => {
            setCart(cart.filter((cartOffer) => cartOffer.id !== id));
        }
    }

    return (
        <>
            <div
                onMouseEnter={() => {
                    setIsShow(true)
                    if (hideTimeout) clearTimeout(hideTimeout)
                }}
                onMouseLeave={() => {
                    const timeout = setTimeout(() => {
                        setIsShow(false)
                    }, 1000)
                    setHideTimeout(timeout);
                }}
            >
                <div>
                    Całkowity koszt: {getTotalPrice()} PLN, Liczba szkoleń: {cart.length}
                </div>
                {isShow && (
                    <ul>
                        {cart.map((cartOffer) => (
                            <li key={cartOffer.id}>
                                {cartOffer.title}
                                <button onClick={removeOffer(cartOffer.id)}>Usuń</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Cart;