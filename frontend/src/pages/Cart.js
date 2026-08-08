import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function Cart() {

    const {
        cart,
        removeFromCart
    } = useContext(CartContext);

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {

        return (

            <div className="empty-cart">

                <h1>
                    Your Cart is Empty
                </h1>

                <p>
                    Looks like you haven't added
                    anything yet.
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

            <div className="cart-header">

                <div>

                    <p className="section-label">
                        SHOPPING CART
                    </p>

                    <h1>
                        Your Cart
                    </h1>

                </div>

                <Link to="/">
                    Continue Shopping
                </Link>

            </div>


            <div className="cart-layout">

                <div className="cart-items">

                    {cart.map(item => (

                        <div
                            className="cart-item"
                            key={item._id}
                        >

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div className="cart-item-info">

                                <span className="category">
                                    {item.category}
                                </span>

                                <h3>
                                    {item.name}
                                </h3>

                                <p>
                                    Quantity:{" "}
                                    {item.quantity}
                                </p>

                                <strong>
                                    ₹
                                    {(
                                        item.price *
                                        item.quantity
                                    ).toLocaleString("en-IN")}
                                </strong>

                                <button
                                    onClick={() =>
                                        removeFromCart(
                                            item._id
                                        )
                                    }
                                    className="remove-button"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                <div className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>

                    <div className="summary-row">

                        <span>
                            Items
                        </span>

                        <span>
                            {cart.reduce(
                                (sum, item) =>
                                    sum + item.quantity,
                                0
                            )}
                        </span>

                    </div>

                    <div className="summary-row">

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ₹
                            {total.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                    <hr />

                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹
                            {total.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                    <Link
                        to="/checkout"
                        className="primary-button checkout-button"
                    >
                        Proceed to Checkout
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default Cart;