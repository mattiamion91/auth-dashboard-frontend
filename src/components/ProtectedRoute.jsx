import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth();

    if(isAuthenticated) {
        return children
    } else {
        return <Navigate to='/login'/>
    }

}

export default ProtectedRoute;