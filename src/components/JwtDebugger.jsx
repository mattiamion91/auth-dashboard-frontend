import { useAuth } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode'

function JwtDebugger() {
    const { accessToken } = useAuth();

    if (!accessToken) return null

    try {
        const decoded = jwtDecode(accessToken);
        return (
            <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
                <h3>🔍 JWT Debugger (didattico)</h3>
                <p><strong>Header:</strong> Algoritmo HS256, tipo JWT</p>
                <p><strong>Payload (decodificato):</strong></p>
                <pre style={{ background: '#f5f5f5', padding: '10px' }}>
                    {JSON.stringify(decoded, null, 2)}
                </pre>
                <p><strong>Nota didattica:</strong> Il JWT è BASE64URL encoded, NON crittografato!
                    Chiunque può decodificarlo e vedere il contenuto.</p>
            </div>
        );

    } catch (err) {
        return <p>errore nella decodificazione del token</p>
    }
}

export default JwtDebugger