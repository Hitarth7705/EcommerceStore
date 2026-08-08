import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Checkout() {

    const { cart, clearCart } = useContext(CartContext);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: ""
    });

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const placeOrder = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login before placing an order.");
            navigate("/login");
            return;
        }

        const orderItems = cart.map((item) => ({
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image
        }));

        const response = await fetch(
            "http://localhost:5000/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    orderItems,
                    shippingAddress: form,
                    paymentMethod: "Cash on Delivery",
                    totalPrice: total
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            clearCart();

            alert("Order placed successfully!");

            navigate("/");

        } else {

            alert(data.message);

        }
    };

    return (
        <div className="checkout-page">

            <h1>Checkout</h1>

            <form
                className="checkout-form"
                onSubmit={placeOrder}
            >

                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                />

                <input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />

                <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                />

                <input
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    required
                />

                <input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                />

                <div className="payment-box">
                    <strong>Payment Method</strong>
                    <p>Cash on Delivery</p>
                </div>

                <h2>
                    Total:
                    ₹{total.toLocaleString("en-IN")}
                </h2>

                <button
                    type="submit"
                    className="primary-button"
                >
                    Place Order
                </button>

            </form>

        </div>
    );
}

export default Checkout;