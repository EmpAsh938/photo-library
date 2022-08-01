import { Navigate } from 'react-router-dom';

// protected route: login signup (don't show for loggedin users)

type Props = {
    outlet: JSX.Element;
    isLoggedIn: boolean;
}

export const ProtectedRoute = ({ outlet, isLoggedIn }:Props) => {
    if(isLoggedIn) {
        return <Navigate to='/' />
    } 
    return outlet;
}