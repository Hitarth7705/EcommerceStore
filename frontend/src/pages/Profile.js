import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {

    const { user, logout, loading } = useAuth();

    const navigate = useNavigate();

    // Redirect to login if user is not logged in
    useEffect(() => {

        if (!loading && !user) {
            navigate("/login");
        }

    }, [user, loading, navigate]);


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    // While checking authentication
    if (loading) {

        return (
            <div className="profile-loading">
                Loading profile...
            </div>
        );

    }


    // If there is no user
    if (!user) {
        return null;
    }


    return (

        <div className="profile-page">

            <div className="profile-container">

                {/* Profile Header */}

                <div className="profile-header">

                    <div className="profile-avatar">

                        {user.name
                            ? user.name.charAt(0).toUpperCase()
                            : "U"
                        }

                    </div>

                    <div>

                        <p className="section-label">
                            MY ACCOUNT
                        </p>

                        <h1>
                            {user.name || "User"}
                        </h1>

                        <p className="profile-email">
                            {user.email}
                        </p>

                    </div>

                </div>


                {/* Personal Information */}

                <div className="profile-card">

                    <div className="profile-card-header">

                        <div>

                            <p className="section-label">
                                ACCOUNT
                            </p>

                            <h2>
                                Personal Information
                            </h2>

                        </div>

                    </div>


                    <div className="profile-info-grid">

                        <div className="profile-info">

                            <span>
                                Full Name
                            </span>

                            <strong>
                                {user.name || "Not provided"}
                            </strong>

                        </div>


                        <div className="profile-info">

                            <span>
                                Email Address
                            </span>

                            <strong>
                                {user.email || "Not provided"}
                            </strong>

                        </div>


                        <div className="profile-info">

                            <span>
                                User ID
                            </span>

                            <strong className="user-id">
                                {user._id || "Not available"}
                            </strong>

                        </div>


                        <div className="profile-info">

                            <span>
                                Account Status
                            </span>

                            <strong className="status-active">
                                Active
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Account Actions */}

                <div className="profile-actions">

                    <Link
                        to="/orders"
                        className="profile-action-card"
                    >

                        <div className="action-icon">
                            📦
                        </div>

                        <div>

                            <h3>
                                My Orders
                            </h3>

                            <p>
                                View your previous orders
                            </p>

                        </div>

                    </Link>


                    <Link
                        to="/cart"
                        className="profile-action-card"
                    >

                        <div className="action-icon">
                            🛒
                        </div>

                        <div>

                            <h3>
                                My Cart
                            </h3>

                            <p>
                                View items in your cart
                            </p>

                        </div>

                    </Link>

                </div>


                {/* Logout */}

                <div className="profile-logout">

                    <button
                        onClick={handleLogout}
                        className="profile-logout-button"
                    >
                        Logout from account
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Profile;