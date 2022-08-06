import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { RegisterObj } from '../pages/Signup';

type Props = {
    children: React.ReactNode;
}

type UserObj = {
    email: string;
    token: string;
}

type AuthContextValue = {
    user: UserObj;
    loginError: string;
    isLoggedIn: boolean;
    registerError: string;
    handleRegister: (obj:RegisterObj) => void;
    handleError: (msg:string,type:string) => void;
    handleLogin: (email:string,password:string) => void;
}

enum LskConst {
    AuthLSK = 'authCreds'
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
    const [loginError, setLoginError] = useState<string>('');
    const [registerError, setRegisterError] = useState<string>('');



    const handleLogin = async (email:string,password:string) => {
        let url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndPoint.login}`;
        try {
            const response = await axios.post(url, {
                email,
                password
            })
            const result = response.data;
                setIsLoggedIn(true);
                setUser({
                    ...user,
                    email: result.body[0].email,
                    token: result.body[0].token
                })
                localStorage.setItem(LskConst.AuthLSK,JSON.stringify(user));
        } catch (error:any) {
            handleError(error.message,'login');
        }
    }
    
    const handleRegister = async (obj:RegisterObj) => {
        let url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndPoint.register}`;
        try {
            const response = await axios.post(url,obj); 
            const result = response.data;

                setIsLoggedIn(true);
                setUser({
                    ...user,
                    email: result.data.body[0].email,
                    token: result.data.body[0].token
                })
            } catch (error:any) {
                handleError(error.message,'register');
            }
    }

    const handleError = (msg:string,type:string) => {
        if(type==='login') {
            setLoginError(msg);
        } else if (type==='register') {
            setRegisterError(msg);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoginError('');
            setRegisterError('');
        }, 1000)
        return () => clearTimeout(timer);
    }, [loginError,registerError])

    useEffect(() => {
        const getLSK = JSON.parse(localStorage.getItem(LskConst.AuthLSK) || '{}');
        if(getLSK) {
            setIsLoggedIn(true);
            setUser({
                ...getLSK
            })
        }
    }, [])

    useEffect(() => {
        if(isLoggedIn) localStorage.setItem(LskConst.AuthLSK,JSON.stringify(user));
    }, [user,isLoggedIn])

    return (
        <AuthContext.Provider value={{
            user,
            loginError,
            isLoggedIn,
            registerError,
            handleError,
            handleLogin,
            handleRegister
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;