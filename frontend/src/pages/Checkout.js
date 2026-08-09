import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function Checkout() {

    const { cart } = useContext(CartContext);

    const navigate = useNavigate();

    const [user] = useState(() => {

        const storedUser =
            localStorage.getItem("user");

        return storedUser
            ? JSON.parse(storedUser)
            : null;
    });

    const [address, setAddress] = useState({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const shipping = subtotal >= 1000 ? 0 : 100;

    const total = subtotal + shipping;


    const handleChange = (e) => {

        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!user) {
            alert("Please login before checkout.");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            navigate("/cart");
            return;
        }

        setLoading(true);

        /*
         * Order API will be connected here.
         *
         * For now we simulate order creation.
         */

        try {

            await new Promise(
                resolve =>
                    setTimeout(resolve, 1000)
            );

            alert("Order placed successfully!");

            setLoading(false);

            navigate("/");

        } catch (error) {

            console.error(error);

            setLoading(false);

            alert(
                "Something went wrong. Please try again."
            );

        }

    };


    if (!user) {

        return (

            <div className="checkout-login">

                <h1>
                    Login Required
                </h1>

                <p>
                    Please login to continue checkout.
                </p>

                <Link
                    to="/login"
                    className="primary-button"
                >
                    Login
                </Link>

            </div>

        );

    }


    if (cart.length === 0) {

        return (

            <div className="checkout-login">

                <h1>
                    Your Cart is Empty
                </h1>

                <p>
                    Add products to your cart before checkout.
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

        <div className="checkout-page">

            <div className="checkout-container">

                <div className="checkout-header">

                    <p className="section-label">
                        QEVANTA CHECKOUT
                    </p>

                    <h1>
                        Checkout
                    </h1>

                    <p>
                        Complete your details to place your order.
                    </p>

                </div>


                <div className="checkout-layout">

                    {/* SHIPPING FORM */}

                    <div className="checkout-form-card">

                        <div className="checkout-section-title">

                            <span>
                                01
                            </span>

                            <div>
                                <h2>
                                    Shipping Information
                                </h2>

                                <p>
                                    Where should we deliver your order?
                                </p>
                            </div>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="checkout-two-columns">

                                <div className="checkout-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        value={address.fullName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="checkout-field">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={address.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            <div className="checkout-field">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={address.phone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="checkout-field">

                                <label>
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    placeholder="House number, street, area"
                                    value={address.address}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />

                            </div>


                            <div className="checkout-three-columns">

                                <div className="checkout-field">

                                    <label>
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={address.city}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="checkout-field">

                                    <label>
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={address.state}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="checkout-field">

                                    <label>
                                        PIN Code
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={address.pincode}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* PAYMENT */}

                            <div className="checkout-section-title payment-title">

                                <span>
                                    02
                                </span>

                                <div>

                                    <h2>
                                        Payment Method
                                    </h2>

                                    <p>
                                        Select your preferred payment method.
                                    </p>

                                </div>

                            </div>


                            <div className="payment-option">

                                <input
                                    type="radio"
                                    name="payment"
                                    checked
                                    readOnly
                                />

                                <div>

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <p>
                                        Pay when your order arrives.
                                    </p>

                                </div>

                            </div>


                            <button
                                type="submit"
                                className="primary-button place-order-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Placing Order..."
                                    : "Place Order"
                                }

                            </button>

                        </form>

                    </div>


                    {/* ORDER SUMMARY */}

                    <div className="checkout-summary">

                        <div className="summary-heading">

                            <p className="section-label">
                                YOUR ORDER
                            </p>

                            <h2>
                                Order Summary
                            </h2>

                        </div>


                        <div className="checkout-items">

                            {cart.map(item => (

                                <div
                                    className="checkout-item"
                                    key={item._id}
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <div>

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <p>
                                            Qty: {item.quantity}
                                        </p>

                                        <strong>
                                            ₹
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString("en-IN")}
                                        </strong>

                                    </div>

                                </div>

                            ))}

                        </div>


                        <div className="checkout-price-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹
                                {subtotal.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <div className="checkout-price-row">

                            <span>
                                Shipping
                            </span>

                            <strong>

                                {shipping === 0
                                    ? "FREE"
                                    : `₹${shipping}`
                                }

                            </strong>

                        </div>


                        <hr />


                        <div className="checkout-total">

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
                            to="/cart"
                            className="back-to-cart"
                        >
                            ← Back to Cart
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Checkout;