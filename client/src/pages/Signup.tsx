import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export type RegisterObj = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

const Signup = () => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { handleRegister, registerError } = useAuthContext();

    const handleSubmit = (e:MouseEvent | FormEvent) => {
        e.preventDefault();
        handleRegister({firstname,lastname,username,email,password});
        setFirstname('');
        setLastname('');
        setUsername('');
        setPassword('');
        setEmail('');
    }
    return (
        <main className='min-h-screen grid place-items-center p-2 bg-slate-50'>
            <section className='max-w-sm w-full p-4 border border-solid border-slate-300 rounded flex flex-col gap-2 bg-white'>
                {registerError && <p className='text-center bg-red-400 text-white py-1 text-sm rounded-sm'>{registerError}</p>}
                <h2 className='my-3 text-center text-2xl font-medium text-green-900'>New users? Register here</h2>
                <form className='flex flex-col gap-4 p-2' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="firstname">FirstName</label>
                        <input 
                        value={firstname}
                        onChange={e=>setFirstname(e.target.value)}
                        className='border border-solid border-slate-300 outline-none px-4 py-1' type="text" id="firstname" />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lastname">LastName</label>
                        <input 
                        value={lastname}
                        onChange={e=>setLastname(e.target.value)}
                        className='border border-solid border-slate-300 outline-none px-4 py-1' type="text" id="lastname" />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="username">Username</label>
                        <input 
                        value={username}
                        onChange={e=>setUsername(e.target.value)}
                        className='border border-solid border-slate-300 outline-none px-4 py-1' type="text" id="username" />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input 
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        className='border border-solid border-slate-300 outline-none px-4 py-1' type="text" id="email" />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input 
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        className='border border-solid border-slate-300 outline-none px-4 py-1' type="password" id="password" />
                    </div>
                    <div className='flex gap-1 text-sm'>
                        <p>Already have an account?</p>
                        <Link to='/login' className='font-bold hover:underline'>Login</Link>
                    </div>
                    <div>
                        <button className='w-[150px] mx-auto block border-none bg-green-600 text-white py-2 rounded hover:bg-green-700' onClick={handleSubmit}>Register</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Signup;