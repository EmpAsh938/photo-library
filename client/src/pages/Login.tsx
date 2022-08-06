import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { handleLogin, handleError, loginError } = useAuthContext();

    const handleClick = (e:MouseEvent | FormEvent) => {
        e.preventDefault();
        if(!email || !password) {
            handleError('Fields can\'t be empty','login');
        } else {
            handleLogin(email,password);
            setEmail('');
            setPassword('');
        }
    }


    
    return (
        <main className='min-h-screen grid place-items-center p-2 bg-slate-50'>
            <section className='max-w-sm w-full p-4 border border-solid border-slate-300 rounded flex flex-col gap-2 bg-white'>
                {loginError && <p className='text-center text-sm py-1 rounded-sm
                 bg-red-400 text-white'>{loginError}</p>}
                <h2 className='text-center text-4xl font-medium text-green-900'>Login</h2>
                <form className='flex flex-col gap-4 p-2' onSubmit={handleClick}>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input 
                        className='border border-solid border-slate-300 outline-none px-4 py-1' 
                        type="text" 
                        id="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input 
                        className='border border-solid border-slate-300 outline-none px-4 py-1' 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-1 text-sm'>
                        <p>New Here?</p>
                        <Link to='/signup' className='font-bold hover:underline'>Create a free account</Link>
                    </div>
                    <div>
                        <button className='w-[150px] mx-auto block border-none bg-green-600 text-white py-2 rounded' onClick={handleClick}>Login</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Login;