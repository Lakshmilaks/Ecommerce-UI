import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

// eslint-disable-next-line react/prop-types
function ProtectedRoute  ({children})  {
    const { isLogin } = useContext(AuthContext);

    if (!isLogin) {
        return <Navigate to="/login-form" />
    }
    return (<>{children}</>)
}

export default ProtectedRoute
