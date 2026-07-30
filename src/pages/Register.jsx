import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function sendRegisterData(email, password, confirmPassword) {
        const url = 'http://localhost:5000/api/auth/register'
        const dataRegister = { email, password, confirmPassword }

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataRegister)
            })

            if (!res.ok) {
                throw new Error(`error: ${res.status}`)
            }

            const data = await res.json()

            return true

        } catch (err) {
            console.error(err);

            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Le password non coincidono');
            return
        }

        const success = await sendRegisterData(email, password, confirmPassword)
        console.log('success:', success);
        if (success) {
            console.log('Registrazione avvenuta con successo');
            navigate('/login')
        } else {
            setErrorMessage('Errore registarzione')
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ripeti la Password"
            />
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Registrati</button>
        </form>
    )
}

export default Register;