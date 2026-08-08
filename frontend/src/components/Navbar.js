import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    User,
    LogOut
} from "lucide-react";

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {

    const { cart } = useContext(CartContext);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        const token =
            localStorage.getItem("token");

        if (token && storedUser) {

            try {

                setUser(
                    JSON.parse(storedUser)
                );

            } catch (error) {

                console.error(
                    "Invalid user data"
                );

            }

        }

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

        navigate("/login");
    };

    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                ShopSphere
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