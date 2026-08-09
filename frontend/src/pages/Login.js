import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log("Login response:", data);

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }
            if (data.token && data.user) {

                login(
                    data.user,
                    data.token
                );

            }
            alert("Login successful!");

            navigate("/");

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            alert(
    "Cannot connect to the server. Please try again."
);
        }
    };

    return (

        <div className="auth-page">

            <div className="auth-card">

                <p className="section-label">
                    WELCOME BACK
                </p>

                <h1>
                    Login
                </h1>

                <p className="auth-subtitle">
                    Sign in to your QEVANTA account.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="primary-button auth-button"
                    >
                        Login
                    </button>

                </form>

                <p className="auth-footer">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Create one
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;