import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to={currentUser ? "/tasks" : "/"}>Task Manager</Link>
            </div>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/tasks" className="nav-link">Tasks</Link>
                </li>
                {currentUser ? (
                    <>
                        <li className="nav-item">
                            <span className="nav-link">{currentUser.username}</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" onClick={handleLogout}>
                                Logout
                            </span>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar