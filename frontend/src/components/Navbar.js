import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
    const { cart } = useContext(CartContext);

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                ShopSphere
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/login">
                    <User size={18} />
                    Login
                </Link>

                <Link to="/cart" className="cart-link">
                    <ShoppingCart size={20} />
                    Cart
                    {cart.length > 0 && (
                        <span className="cart-count">
                            {cart.length}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;