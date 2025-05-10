import React from "react";
import { useState } from "react";

function LoginForm(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    //handle input changesss
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    //handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

    //validation
    if(!username || !password || !confirmPassword){
        setError("Попълни полетата бе балък")
        return
    }

    setError(null)
    setIsLoading(true)

        setTimeout(() =>{
            setIsLoading(false)
        }, 1000)
        
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
                    type="password" // Use type="password" to hide input
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