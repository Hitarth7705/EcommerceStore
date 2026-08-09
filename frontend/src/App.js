import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

import { CartProvider } from "./context/CartContext";
import Profile from "./pages/Profile";

import "./App.css";
function App() {

    return (

        <BrowserRouter>

            <AuthProvider>

                <CartProvider>

                    <Navbar />

                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/product/:id"
                            element={<ProductDetails />}
                        />

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                        <Route
                            path="/register"
                            element={<Register />}
                        />

                        <Route
                            path="/cart"
                            element={<Cart />}
                        />

                    </Routes>

                </CartProvider>

            </AuthProvider>

        </BrowserRouter>

    );
}

export default App;