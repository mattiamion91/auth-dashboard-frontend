import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const { sendLogin } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await sendLogin(email, password)
        console.log('success:', success);
        if (success) {
            console.log('sto per navigare');
            navigate('/dashboard')
        } else {
            setErrorMessage('Credenziali non Valide')
        }

        //console.log(email, password);
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
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Accedi</button>
        </form>
    );
}

export default Login;