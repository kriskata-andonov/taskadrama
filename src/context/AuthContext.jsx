import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser')
        return storedUser ? JSON.parse(storedUser) : null
    })
    useEffect(() => {
        if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
        localStorage.removeItem('currentUser');
        }
    }, [currentUser])

    const login = (user) => {
        setCurrentUser(user)
    }

    const logout = () => {
        setCurrentUser(null)
    }

    const value = {
        currentUser,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}