import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <main className='min-h-screen grid place-items-center p-2 bg-slate-50'>
            <section className='max-w-sm w-full p-4 border border-solid border-slate-300 rounded flex flex-col gap-2 bg-white'>
                <h2 className='text-center text-4xl font-medium text-green-900'>Login</h2>
                <form className='flex flex-col gap-4 p-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input className='border border-solid border-slate-300 outline-none px-4 py-1' type="text" id="email" />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input className='border border-solid border-slate-300 outline-none px-4 py-1' type="password" id="password" />
                    </div>
                    <div className='flex gap-1 text-sm'>
                        <p>New Here?</p>
                        <Link to='/signup' className='font-bold hover:underline'>Create a free account</Link>
                    </div>
                    <div>
                        <button className='w-[150px] mx-auto block border-none bg-green-600 text-white py-2 rounded'>Login</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Login;