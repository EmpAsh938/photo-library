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
}


export const AuthContext = createContext({} as AuthContextValue);

const AuthProvider = ({ children }:Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<UserObj>({
        email: '',
        token: ''
    });

    useEffect(() => {

    // eslint-disable-next-line
    }, [])
    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;