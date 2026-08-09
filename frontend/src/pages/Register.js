import { useState } from "react";
import API from "../api";
function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                 `${API}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert("Registration successful!");

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {
            console.error(error);

            alert(
    "Cannot connect to the server. Please try again."
);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <p className="section-label">
                    JOIN QEVANTA
                </p>

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Create your account to start shopping.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Create a password"
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
                        Create Account
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <a href="/login">
                        Login
                    </a>
                </p>

            </div>

        </div>
    );
}

export default Register;