import React from "react";
import { useState } from "react";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const { login } = useAuth()
    const navigate = useNavigate()

    //handle input changesss
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    //handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

    //validation
    if(!username || !password){
        setError("Попълни полетата бе балък")
        return
    }

    setError(null)
    setIsLoading(true)

    try {
        const user = await loginUser(username, password);
        console.log('Login succ:', user);
        login(user); 
        navigate('/tasks'); 
    } catch (err) {
        console.error('login failed: ', err);
        setError(err.message || 'err occured');
    } finally {
        setIsLoading(false);
    }
}
    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p stryle={{color: 'red'}}>{error}</p>}

            <div>
                <label htmlFor="login-username">Username:</label>
                <input
                    tyoe="text"
                    id="login-username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    />
            </div>

            <div>
                <label htmlFor="login-password">Password:</label>
                <input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'Login'}
            </button>
        </form>
    )
}
export default LoginForm