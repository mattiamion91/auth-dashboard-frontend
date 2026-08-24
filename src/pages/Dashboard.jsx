import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import JwtDebugger from '../components/JwtDebugger';
import { useState } from 'react';

function Dashboard() {
    const { user, sendLogout, sendRefresh } = useAuth();
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshError, setRefreshError] = useState(null)

    async function handleLogout() {
        setIsRefreshing(true); //uso lo stesso stato per semplicita anche se si tratta del logout
        try {
            await sendLogout()
            navigate('/login', { replace: true }) //percorso assoluto + sostituzione cronologia}
        } catch (err) {
            console.error('Errore logout', err);
        } finally {
            setIsRefreshing(false)
        }
    }

    async function handleRefreshToken () {
        setIsRefreshing(true)
        setRefreshError(null)//stati inniziali

        try {
            const success = await sendRefresh();
            if(success) {
                console.log('il token é stato refreshato con successo'); //se succecco esiste 
            } else {
                setRefreshError('impossibile refreshare token - eseguire nuovamente login')                              
            } 
        } catch(err) {
            setIsRefreshing('errore durante refresh token')
            console.error('errore', err);
        } finally {
            setIsRefreshing(false);
        }
    }

    return (
        <>
            <p>Benvenuto {user.email}</p>
            <p>il tuo ruolo é {user.role}</p>
            {user.role === 'admin' && <p>sei un amministratore!!</p>}

            {/*learning jwt*/}
            <JwtDebugger />

            {/* SEZIONE DIDATTICA PER IL REFRESH TOKEN */}
            <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
                <h3>🔁 Test Refresh Token (Didattico)</h3>
                <p>Questo bottone chiama manualmente l'endpoint <code>/api/auth/refresh</code> per ottenere un nuovo access token usando il refresh token salvato in localStorage.</p>
                
                {refreshError && (
                    <p style={{ color: 'red', margin: '10px 0' }}>❌ {refreshError}</p>
                )}
                
                <button 
                    onClick={handleRefreshToken}
                    disabled={isRefreshing}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: isRefreshing ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isRefreshing ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isRefreshing ? 'Aggiornamento...' : 'Rinnova Access Token'}
                </button>
                
                {!isRefreshing && !refreshError && (
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                        💡 Nota didattica: Il refresh token ha durata maggiore (7 giorni nel tuo backend) 
                        e serve solo a ottenere nuovi access token senza richiedere nuovamente le credenziali.
                    </p>
                )}
            </div>

            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Dashboard;