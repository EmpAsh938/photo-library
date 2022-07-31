import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className='border-b-2 border-solid border-gray-200'>
            <nav className='max-w-[1200px] mx-auto p-4 py-8 flex justify-between items-center'>
                <div>
                    <h2 className='text-xl font-medium text-red-900'>Photo Library</h2>
                </div>
                <div className='flex gap-4 text-sm items-center'>
                    <Link to='/login' className='
                    px-2
                    py-1
                    rounded
                    cursor-pointer
                    border-[1px]
                    border-solid
                    border-gray-400
                    text-gray-700
                    px-3
                    '>Login</Link>
                    <Link to='/signup' className='
                    px-2
                    py-1
                    rounded
                    cursor-pointer
                    border-[1px]
                    border-solid
                    border-gray-400
                    text-gray-700
                    px-3
                    '>Join</Link>
                    <button className='
                    text-gray-50
                     bg-green-700
                      px-2
                       py-1
                        rounded
                        px-3
                         cursor-pointer
                          transition-all
                           hover:opacity-90
                           active:opacity-80
                           '>Upload</button>
                    {/* <button className=''>menu</button> */}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;