import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {

    const {
        cart,
        removeFromCart,
        updateQuantity
    } = useContext(CartContext);

    const navigate = useNavigate();

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {

        return (
            <div className="empty-cart">

                <h1>Your cart is empty</h1>

                <p>
                    Add some products to continue shopping.
                </p>

                <Link
                    to="/"
                    className="primary-button"
                >
                    Continue Shopping
                </Link>

            </div>
        );
    }

    return (
        <div className="cart-page">

            <h1>Your Shopping Cart</h1>

            <div className="cart-layout">

                <div className="cart-items">

                    {cart.map((item) => (

                        <div className="cart-item" key={item._id}>

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div className="cart-item-info">

                                <h3>{item.name}</h3>

                                <p>
                                    ₹{item.price.toLocaleString("en-IN")}
                                </p>

                                <div className="quantity">

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item._id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item._id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        removeFromCart(item._id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="cart-summary">

                    <h2>Order Summary</h2>

                    <div>
                        <span>Subtotal</span>

                        <strong>
                            ₹{total.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div>
                        <span>Shipping</span>
                        <strong>FREE</strong>
                    </div>

                    <hr />

                    <div className="total">
                        <span>Total</span>

                        <strong>
                            ₹{total.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <button
                        className="primary-button full"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to Checkout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Cart;