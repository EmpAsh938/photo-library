import { createContext, useEffect, useState } from 'react';

type Props = {
    children: React.ReactNode;
}

type UserObj = {
    email: string;
    token: string;
}

type AuthContextValue = {
    isLoggedIn: boolean;
    user: UserObj;
    handleLogin: () => void;
    handleRegister: () => void;
}

enum ApiEndPoint {
    login = 'auth/login',
    register = 'auth/register'
}


export const AuthContext = createContext({} as AuthContextValue);

const AuthProvider = ({ children }:Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<UserObj>({
        email: '',
        token: ''
    });


    const handleLogin = () => {
        let url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndPoint.login}`;
    }
    
    const handleRegister = () => {
        let url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndPoint.register}`;

    }

    useEffect(() => {

    // eslint-disable-next-line
    }, [])
    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            handleLogin,
            handleRegister
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;