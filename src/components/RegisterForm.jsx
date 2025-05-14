import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import './RegiterForm.css'

function RegisterForm(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const navigate = useNavigate()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess(null);
        setError(null);

        if (!username || !password || !confirmPassword) {
            setError("Попълни полетата");
            return;
        }

        if (password !== confirmPassword) {
            setError("Пак не си оцели паролата");
            return;
        }

        setIsLoading(true);
        console.log("reg attempt: ", { username, password });
        try {
            const user = await registerUser(username, password);
            setSuccess("Регистрацията е успешна!");
            console.log("Registration success:", user);
            navigate('/login'); 
        } catch (err) {
            setError(err.message || "Възникна грешка при регистрация");
            console.error("Registration failed:", err);
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <form onSubmit={handleSubmit}>
      <br />
      <div>
        <label htmlFor="register-username" className="usernameLabel">Username: </label>
        <input
          type="text"
          id="register-username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="register-password" className="passwordLabel">Password: </label>
        <input
          type="password"
          id="register-password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <br />
      </div>
      <br />
      <div>
        <label htmlFor="register-confirm-password" className="passwordLabel">Confirm Password: </label>
        <input
          type="password"
          id="register-confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </div>
      <br />
      <button type="submit" disabled={isLoading}>
         {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
export default RegisterForm