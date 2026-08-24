import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const sendLogin = async (email, password) => {

        const url = 'http://localhost:5000/api/auth/login'
        const dataLogin = { email, password }

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataLogin)
            })

            if (!res.ok) {
                throw new Error(`error: ${res.status}`)
            }

            const data = await res.json()

            setUser(data.user)
            setAccessToken(data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)

            return true

        } catch (err) {
            console.error('login fallito', err);
            return false
        }

    }

    const sendLogout = async () => {

        const url = 'http://localhost:5000/api/auth/logout'
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            })

            if (!res.ok) {
                throw new Error(`error: ${res.status}`)
            }

        } catch (err) {
            console.error('logout fallito lato server', err);
        } finally {
            setUser(null)
            setAccessToken(null)
            localStorage.removeItem('refreshToken');

        }
    }

    const sendRefresh = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            console.error('nessun refresh token disponibile');
            return false
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            });

            if (!res.ok) {
                throw new Error(`errore: ${res.status}`)
            }

            const data = await res.json()
            setAccessToken(data.accessToken)
            return true
        } catch (error) {
            console.error('refresh fallito', error);
            return false
        }
    }

    const value = {
        user,
        accessToken,
        isAuthenticated: !!accessToken,
        sendLogin,
        sendLogout,
        sendRefresh
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext)
}