import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { RegisterObj } from '../pages/Signup';

type Props = {
    children: React.ReactNode;
}

type UserObj = {
    email: string;
    id: string;
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
    register = 'auth/register',
    verify = 'auth/verify'
}


export const AuthContext = createContext({} as AuthContextValue);

const AuthProvider = ({ children }:Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<UserObj>({
        email: '',
        id: '',
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
                    id: result.body[0].id,
                    token: result.body[0].token
                })
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
                    id: result.data.body[0].id,
                    token: result.data.body[0].token
                })
            } catch (error:any) {
                handleError(error.message,'register');
            }
    }

    const handleVerification = async (token: string) => {
        let url = `${process.env.REACT_APP_API_ENDPOINT}/${ApiEndPoint.verify}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': token
                }
            });
            const result = response.data;
            setIsLoggedIn(true);
            setUser({
                ...user,
                email: result.body.email,
                id: result.body.id,
                token: result.body.token
            })
        } catch (error) {
            setIsLoggedIn(false);
            setUser({
                email: '',
                id: '',
                token: ''
            })
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
        if(Object.keys(getLSK).length !== 0) {
            handleVerification(getLSK.token);
        }
    // eslint-disable-next-line
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