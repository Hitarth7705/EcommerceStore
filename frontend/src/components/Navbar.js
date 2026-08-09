import { Link, useNavigate } from "react-router-dom";

import {
    ShoppingCart,
    User,
    LogOut
} from "lucide-react";

import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { cart } = useContext(CartContext);

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                QEVANTA
            </Link>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                {user ? (

                    <>

                        <Link to="/profile">

                            <User size={18} />

                            <span>
                                {user.name || "Account"}
                            </span>

                        </Link>

                        <button
                            onClick={handleLogout}
                            className="logout-button"
                        >

                            <LogOut size={18} />

                            Logout

                        </button>

                    </>

                ) : (

                    <Link to="/login">

                        <User size={18} />

                        Login

                    </Link>

                )}

                <Link
                    to="/cart"
                    className="cart-link"
                >

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