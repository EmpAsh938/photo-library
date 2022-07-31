import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <main className='min-h-screen p-3'>
            <section className='h-full w-full'>
                <div className='max-w-lg mt-10 mx-auto flex items-center gap-2'>
                    <h1 className='text-5xl'>404</h1>
                    <p>page not found</p>
                </div>
                <div className='mt-5'>
                    <Link to='/' className='bg-green-600 block w-fit m-auto text-center
                    px-5 py-1 rounded text-white'>Get back Home</Link>
                </div>
            </section>
        </main>
    )
}

export default Error;