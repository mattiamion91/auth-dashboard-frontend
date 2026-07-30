import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { user, sendLogout } = useAuth();
    const navigate = useNavigate();

    async function logoutChangingPath () {
        await sendLogout()
        navigate('../login')
    }

    return (
        <>
            <p>Benvenuto {user.email}</p>
            <p>il tuo ruolo é {user.role}</p>
            {user.role === 'admin' && <p>sei un amministratore!!</p>}
            <button onClick={logoutChangingPath}>Logout</button>
        </>
    )
}

export default Dashboard;